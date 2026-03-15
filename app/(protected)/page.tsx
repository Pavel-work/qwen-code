'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Plus } from 'lucide-react'
import Link from 'next/link'
import { useContainers } from '@/hooks/use-containers'
import { ContainerList } from '@/components/containers/ContainerList'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  const { user, signOut } = useAuth()
  const { containers, loading, deleteContainer } = useContainers()

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот контейнер?')) {
      try {
        await deleteContainer(id)
      } catch (err) {
        alert('Ошибка при удалении')
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Мои контейнеры</h1>
        <div className="flex gap-2">
          <Link href="/categories">
            <Button variant="outline">Категории</Button>
          </Link>
          <Button onClick={signOut} variant="outline">
            Выйти
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Добро пожаловать!</CardTitle>
          <CardDescription>
            {user?.email}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Link href="/containers/new">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Новый контейнер
              </CardTitle>
              <CardDescription>
                Создайте новый контейнер для вещей
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Контейнеры
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <ContainerList
              containers={containers}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
