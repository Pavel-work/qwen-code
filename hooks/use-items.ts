import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Item, ItemWithRelations } from '@/lib/types'
import { useAuth } from '@/providers/AuthProvider'

export function useItems(containerId?: string) {
  const [items, setItems] = useState<ItemWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchItems = async () => {
    if (!user) return

    try {
      setLoading(true)
      let query = supabase
        .from('items')
        .select(`
          *,
          container:containers(*),
          category:categories(*)
        `)
        .eq('user_id', user.id)

      if (containerId) {
        query = query.eq('container_id', containerId)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (itemData: Partial<Item>) => {
    if (!user) return null

    const { data, error } = await supabase
      .from('items')
      .insert({
        ...itemData,
        user_id: user.id,
      })
      .select(`
        *,
        container:containers(*),
        category:categories(*)
      `)
      .single()

    if (error) throw error
    await fetchItems()
    return data
  }

  const updateItem = async (id: string, updates: Partial<Item>) => {
    const { error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', id)

    if (error) throw error
    await fetchItems()
  }

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchItems()
  }

  useEffect(() => {
    fetchItems()
  }, [containerId, user])

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refresh: fetchItems,
  }
}
