import { Container } from '@/lib/types'
import { ContainerCard } from './ContainerCard'

interface ContainerListProps {
  containers: Container[]
  onEdit?: (container: Container) => void
  onDelete?: (id: string) => void
}

export function ContainerList({ containers, onEdit, onDelete }: ContainerListProps) {
  if (containers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет контейнеров
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {containers.map((container) => (
        <ContainerCard
          key={container.id}
          container={container}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
