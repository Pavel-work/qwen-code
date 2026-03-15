import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Container } from '@/lib/types'
import { useAuth } from '@/providers/AuthProvider'

export function useContainers() {
  const [containers, setContainers] = useState<Container[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchContainers = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setContainers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  const createContainer = async (name: string, description: string) => {
    if (!user) return null

    const { data, error } = await supabase
      .from('containers')
      .insert({
        user_id: user.id,
        name,
        description,
      })
      .select()
      .single()

    if (error) throw error
    await fetchContainers()
    return data
  }

  const updateContainer = async (id: string, updates: Partial<Container>) => {
    const { error } = await supabase
      .from('containers')
      .update(updates)
      .eq('id', id)

    if (error) throw error
    await fetchContainers()
  }

  const deleteContainer = async (id: string) => {
    const { error } = await supabase
      .from('containers')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchContainers()
  }

  useEffect(() => {
    fetchContainers()
  }, [user])

  return {
    containers,
    loading,
    error,
    createContainer,
    updateContainer,
    deleteContainer,
    refresh: fetchContainers,
  }
}
