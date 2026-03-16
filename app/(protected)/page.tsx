'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { StatCard } from '@/components/dashboard/StatCard'
import { ContainerCard } from '@/components/dashboard/ContainerCard'
import { RecentItems } from '@/components/dashboard/RecentItems'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import {
  Package,
  Boxes,
  AlertTriangle,
  Tag,
  Home,
  Search,
  ScanLine,
  Plus,
  Settings,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { user } = useAuth()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { count: containersCount } = await supabase
        .from('containers')
        .select('id', { count: 'exact' })
        .eq('user_id', user?.id)

      const { data: itemsData } = await supabase
        .from('items')
        .select('quantity')
        .eq('user_id', user?.id)

      const totalItems = itemsData?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0

      const { count: lowStockCount } = await supabase
        .from('items')
        .select('id', { count: 'exact' })
        .eq('user_id', user?.id)
        .lte('quantity', 2)

      const { count: categoriesCount } = await supabase
        .from('categories')
        .select('id', { count: 'exact' })
        .eq('user_id', user?.id)

      return {
        containers: containersCount || 0,
        items: totalItems,
        lowStock: lowStockCount || 0,
        categories: categoriesCount || 0,
      }
    },
    enabled: !!user,
  })

  const { data: recentContainers } = useQuery({
    queryKey: ['recent-containers'],
    queryFn: async () => {
      const { data } = await supabase
        .from('containers')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5)
      return data
    },
    enabled: !!user,
  })

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Добро пожаловать! 👋
        </h1>
        <p className="text-textSecondary">
          Обзор вашего склада
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Контейнеры"
          value={stats.containers}
          icon={Boxes}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Всего вещей"
          value={stats.items}
          icon={Package}
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Заканчивается"
          value={stats.lowStock}
          icon={AlertTriangle}
          gradient="from-orange-500 to-amber-600"
        />
        <StatCard
          title="Категории"
          value={stats.categories}
          icon={Tag}
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Быстрое меню */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <QuickLink
          href="/"
          icon={Home}
          label="Главная"
          color="bg-blue-500"
        />
        <QuickLink
          href="/search"
          icon={Search}
          label="Поиск"
          color="bg-green-500"
        />
        <QuickLink
          href="/scanner"
          icon={ScanLine}
          label="Сканер"
          color="bg-purple-500"
        />
        <QuickLink
          href="/containers/new"
          icon={Plus}
          label="Добавить"
          color="bg-orange-500"
        />
        <QuickLink
          href="/settings"
          icon={Settings}
          label="Настройки"
          color="bg-pink-500"
        />
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Последние контейнеры */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-textPrimary">
              Последние контейнеры
            </h2>
            <Link href="/containers" className="text-sm text-primary hover:text-primary/80">
              Смотреть все
            </Link>
          </div>
          <div className="space-y-3">
            {recentContainers?.map((container) => (
              <ContainerCard key={container.id} container={container} />
            ))}
            {!recentContainers?.length && (
              <div className="text-center text-textSecondary py-8">
                Нет контейнеров. Создайте первый!
              </div>
            )}
          </div>
        </div>

        {/* График категорий */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary">
            Распределение
          </h2>
          <CategoryChart />
        </div>
      </div>

      {/* Недавние добавления */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-textPrimary">
          Недавние вещи
        </h2>
        <RecentItems />
      </div>
    </div>
  )
}

// Компонент быстрой ссылки
interface QuickLinkProps {
  href: string
  icon: any
  label: string
  color: string
}

function QuickLink({ href, icon: Icon, label, color }: QuickLinkProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className="bg-backgroundSecondary border-border hover:border-primary/50 transition-colors p-4 cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <div className={`p-3 ${color} rounded-xl`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-textPrimary">{label}</span>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
