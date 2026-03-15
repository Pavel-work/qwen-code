import { ItemWithRelations } from '@/lib/types'
import { ItemCard } from './ItemCard'

interface ItemListProps {
  items: ItemWithRelations[]
  onEdit?: (item: ItemWithRelations) => void
  onDelete?: (id: string) => void
}

export function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет вещей
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
