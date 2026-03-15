'use client'

import { useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useContainers } from '@/hooks/use-containers'
import { useItems } from '@/hooks/use-items'
import { useCategories } from '@/hooks/use-categories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ItemList } from '@/components/items/ItemList'
import { QRCodeDisplay } from '@/components/containers/QRCodeDisplay'
import { ArrowLeft, Plus, Camera } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'

export default function ContainerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const containerId = params.id as string
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { containers } = useContainers()
  const { items, loading, createItem, updateItem, deleteItem } = useItems(containerId)
  const { categories } = useCategories()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [minQuantity, setMinQuantity] = useState(0)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const container = containers.find((c) => c.id === containerId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = null

      // Загрузка фото
      if (imageFile && user) {
        setUploading(true)
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${user.id}/${containerId}/${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('item-photos')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('item-photos')
          .getPublicUrl(fileName)

        imageUrl = urlData.publicUrl
        setUploading(false)
      }

      await createItem({
        container_id: containerId,
        name,
        description,
        quantity,
        min_quantity: minQuantity,
        category_id: categoryId,
        image_url: imageUrl,
      })
      toast.success('Вещь добавлена')
      setOpen(false)
      setName('')
      setDescription('')
      setQuantity(1)
      setMinQuantity(0)
      setCategoryId(null)
      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      console.error('Ошибка:', err)
      toast.error(err instanceof Error ? err.message : 'Ошибка при добавлении вещи')
      setUploading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = async (item: any) => {
    try {
      await updateItem(item.id, {
        name: item.name,
        quantity: item.quantity,
        description: item.description,
      })
    } catch (err) {
      toast.error('Ошибка при обновлении')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Удалить эту вещь?')) {
      try {
        await deleteItem(id)
        toast.success('Вещь удалена')
      } catch (err) {
        toast.error('Ошибка при удалении')
      }
    }
  }

  if (!container) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-muted-foreground">Контейнер не найден</p>
      </div>
    )
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{container.name}</h1>
        {container.description && (
          <p className="text-muted-foreground">{container.description}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <QRCodeDisplay value={`container:${containerId}`} title="QR код контейнера" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Вещи</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить вещь
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая вещь</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например: Молоток"
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
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Количество</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Мин. количество</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(parseInt(e.target.value) || 0)}
                    min="0"
                    placeholder="Для уведомлений"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select
                  value={categoryId || 'none'}
                  onValueChange={(value) => setCategoryId(value === 'none' ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Без категории</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Фото вещи</Label>
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef?.current?.click()}
                    className="w-full gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    {imageFile ? 'Изменить фото' : 'Сделать фото'}
                  </Button>
                </div>
                {imagePreview && (
                  <div className="relative mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Загрузка...' : 'Добавить'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ItemList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
