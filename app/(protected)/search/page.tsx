'use client'

import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ItemList } from '@/components/items/ItemList'
import { ContainerList } from '@/components/containers/ContainerList'
import { Search as SearchIcon, Package, Folder } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { ItemWithRelations, Container } from '@/lib/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<ItemWithRelations[]>([])
  const [containers, setContainers] = useState<Container[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const search = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !user) {
      setItems([])
      setContainers([])
      return
    }

    setLoading(true)
    try {
      // Поиск вещей
      const { data: itemsData, error: itemsError } = await supabase
        .from('items')
        .select(`
          *,
          container:containers(*),
          category:categories(*)
        `)
        .eq('user_id', user.id)
        .ilike('name', `%${searchQuery}%`)

      // Поиск контейнеров
      const { data: containersData, error: containersError } = await supabase
        .from('containers')
        .select('*')
        .eq('user_id', user.id)
        .ilike('name', `%${searchQuery}%`)

      if (itemsError) throw itemsError
      if (containersError) throw containersError

      setItems(itemsData || [])
      setContainers(containersData || [])

      const totalResults = (itemsData?.length || 0) + (containersData?.length || 0)
      if (totalResults > 0) {
        toast.success(`Найдено: ${totalResults}`)
      }
    } catch (err) {
      toast.error('Ошибка при поиске')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    search(query)
  }, [query, search])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Поиск</h1>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск вещей и контейнеров..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Поиск...</p>
          </CardContent>
        </Card>
      ) : query.trim() === '' ? (
        <Card>
          <CardHeader>
            <CardTitle>Результаты поиска</CardTitle>
            <CardDescription>
              Введите запрос для поиска вещей и контейнеров
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              Все ({items.length + containers.length})
            </TabsTrigger>
            <TabsTrigger value="items">
              <Package className="h-4 w-4 mr-1" />
              Вещи ({items.length})
            </TabsTrigger>
            <TabsTrigger value="containers">
              <Folder className="h-4 w-4 mr-1" />
              Контейнеры ({containers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {containers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Контейнеры</h3>
                <ContainerList containers={containers} />
              </div>
            )}
            {items.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Вещи</h3>
                <ItemList items={items} />
              </div>
            )}
            {items.length === 0 && containers.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Ничего не найдено по запросу "{query}"
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="items">
            {items.length > 0 ? (
              <ItemList items={items} />
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Вещи не найдены
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="containers">
            {containers.length > 0 ? (
              <ContainerList containers={containers} />
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Контейнеры не найдены
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
