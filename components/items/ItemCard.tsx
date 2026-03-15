import { ItemWithRelations } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Package, X, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface ItemCardProps {
  item: ItemWithRelations
  onEdit?: (item: ItemWithRelations) => void
  onDelete?: (id: string) => void
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [name, setName] = useState(item.name)
  const [quantity, setQuantity] = useState(item.quantity)
  const [description, setDescription] = useState(item.description || '')

  const handleSave = async () => {
    try {
      if (onEdit) {
        await onEdit({
          ...item,
          name,
          quantity,
          description,
        })
        toast.success('Вещь обновлена')
        setIsEditing(false)
      }
    } catch (err) {
      toast.error('Ошибка при обновлении')
    }
  }

  const isLowStock = item.min_quantity > 0 && item.quantity <= item.min_quantity

  return (
    <>
      <Card className={isLowStock ? 'border-red-500 border-2' : ''}>
        {item.image_url && (
          <div 
            className="relative h-20 w-full overflow-hidden rounded-t-lg cursor-pointer"
            onClick={() => setIsImageOpen(true)}
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <CardTitle 
                className="text-lg cursor-pointer hover:underline"
                onClick={() => setIsViewOpen(true)}
              >
                {item.name}
              </CardTitle>
            </div>
            {item.category && (
              <Badge style={{ backgroundColor: item.category.color }}>
                {item.category.name}
              </Badge>
            )}
          </div>
          {item.description && (
            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Количество: <span className={isLowStock ? 'text-red-500 font-bold' : ''}>{item.quantity}</span>
              {item.min_quantity > 0 && (
                <span className="text-xs ml-2">(мин: {item.min_quantity})</span>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewOpen(true)}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Диалог просмотра вещи */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">{item.name}</DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {item.image_url && (
              <div className="relative">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-auto max-h-96 object-contain rounded-lg cursor-pointer"
                  onClick={() => setIsImageOpen(true)}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Количество</Label>
                <p className="text-lg font-semibold">{item.quantity}</p>
              </div>
              {item.min_quantity > 0 && (
                <div>
                  <Label className="text-muted-foreground">Минимум</Label>
                  <p className="text-lg font-semibold">{item.min_quantity}</p>
                </div>
              )}
            </div>
            {item.category && (
              <div>
                <Label className="text-muted-foreground">Категория</Label>
                <div className="mt-1">
                  <Badge style={{ backgroundColor: item.category.color }}>
                    {item.category.name}
                  </Badge>
                </div>
              </div>
            )}
            {item.description && (
              <div>
                <Label className="text-muted-foreground">Описание</Label>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            )}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsViewOpen(false)
                  setIsEditing(true)
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  setIsViewOpen(false)
                  onDelete?.(item.id)
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать вещь</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Название</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Количество</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог с увеличенным изображением */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setIsImageOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
