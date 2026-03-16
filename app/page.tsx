'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { useContainers } from '@/hooks/use-containers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, AlertTriangle, CheckCircle, Plus, FolderOpen, Tags, Search, ScanLine, Settings, Box, Layers } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function HomePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { containers, loading: containersLoading } = useContainers()
  const [stats, setStats] = useState({ totalItems: 0, lowStock: 0, categories: 0 })
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [chartOptions, setChartOptions] = useState<any>({})
  const [chartSeries, setChartSeries] = useState<number[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    })
  }, [router])

  // Загрузка статистики
  useEffect(() => {
    if (!user) return

    const loadStats = async () => {
      try {
        // Всего вещей
        const { count: itemsCount } = await supabase
          .from('items')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Вещи с низким запасом (quantity < min_quantity)
        const { data: lowStockData } = await supabase
          .from('items')
          .select('quantity, min_quantity')
          .eq('user_id', user.id)

        const lowStockCount = lowStockData?.filter(
          (item) => item.quantity < item.min_quantity && item.min_quantity > 0
        ).length || 0

        // Количество категорий
        const { count: categoriesCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Загружаем категории для графика
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('id, name, color')
          .eq('user_id', user.id)

        setCategories(categoriesData || [])

        setStats({
          totalItems: itemsCount || 0,
          lowStock: lowStockCount,
          categories: categoriesCount || 0,
        })

        // Настройка графика
        setChartOptions({
          chart: {
            type: 'donut',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },
          labels: categoriesData?.map(c => c.name) || [],
          colors: categoriesData?.map(c => c.color) || ['#e0e0e0'],
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  name: { show: true },
                  value: { show: true },
                  total: {
                    show: true,
                    label: 'Всего',
                    formatter: () => stats.totalItems.toString(),
                  },
                },
              },
            },
          },
          dataLabels: { enabled: false },
          legend: { show: false },
        })

        // Загружаем количество вещей по категориям
        const { data: itemsData } = await supabase
          .from('items')
          .select('category_id')
          .eq('user_id', user.id)

        const categoryCount = (categoriesData || []).map(cat => ({
          name: cat.name,
          count: itemsData?.filter(i => i.category_id === cat.id).length || 0,
        }))

        setChartSeries(categoryCount.map(c => c.count))
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error)
      }
    }

    loadStats()
  }, [user])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Box className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">СКЛАД</h1>
            <p className="text-sm text-muted-foreground">Система учёта вещей</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Контейнеры</p>
                {containersLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{containers.length}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Package className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего вещей</p>
                {loading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{stats.totalItems}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Заканчивается</p>
                {loading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-2xl font-bold text-yellow-500">{stats.lowStock}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Tags className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Категории</p>
                {loading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{stats.categories}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График и Быстрое меню */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* График категорий */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Распределение по категориям
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading || categories.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                {categories.length === 0 ? 'Нет категорий' : 'Загрузка...'}
              </div>
            ) : (
              <div className="h-48">
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  height={192}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Быстрое меню */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Быстрое меню</CardTitle>
            <CardDescription>Основные разделы приложения</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/containers/new">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-2">
                  <Plus className="h-6 w-6" />
                  <span>Новый контейнер</span>
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-2">
                  <Tags className="h-6 w-6" />
                  <span>Категории</span>
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-2">
                  <Search className="h-6 w-6" />
                  <span>Поиск</span>
                </Button>
              </Link>
              <Link href="/scanner">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-2">
                  <ScanLine className="h-6 w-6" />
                  <span>QR Сканер</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Последние контейнеры */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Последние контейнеры</CardTitle>
          <CardDescription>Ваши недавние контейнеры</CardDescription>
        </CardHeader>
        <CardContent>
          {containersLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : containers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Нет контейнеров</p>
              <Link href="/containers/new">
                <Button variant="link" className="mt-2">
                  Создать первый контейнер
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {containers.slice(0, 5).map((container) => (
                <Link
                  key={container.id}
                  href={`/container/${container.id}`}
                  className="block p-3 rounded-lg border-2 hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{container.name}</div>
                  {container.description && (
                    <div className="text-sm text-muted-foreground truncate">
                      {container.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
