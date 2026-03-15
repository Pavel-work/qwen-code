import { Container } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ContainerCardProps {
  container: Container
  onEdit?: (container: Container) => void
  onDelete?: (id: string) => void
}

export function ContainerCard({ container, onEdit, onDelete }: ContainerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{container.name}</CardTitle>
        {container.description && (
          <CardDescription>{container.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Link href={`/container/${container.id}`}>
            <Button variant="default" size="sm">
              <ArrowRight className="h-4 w-4 mr-1" />
              Открыть
            </Button>
          </Link>
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(container)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(container.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
