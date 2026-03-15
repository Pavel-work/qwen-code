'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContainers } from '@/hooks/use-containers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewContainerPage() {
  const router = useRouter()
  const { createContainer } = useContainers()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createContainer(name, description)
      toast.success('Контейнер создан!')
      router.push('/')
    } catch (err) {
      console.error('Ошибка создания контейнера:', err)
      toast.error(err instanceof Error ? err.message : 'Ошибка при создании контейнера')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </Link>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Новый контейнер</CardTitle>
          <CardDescription>
            Создайте новый контейнер для хранения вещей
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Ящик с инструментами"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Необязательно"
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Создание...' : 'Создать'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
