'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Card } from '@/components/ui/card'
import { Package, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function RecentItems() {
  const { user } = useAuth()

  const { data: recentItems, isLoading } = useQuery({
    queryKey: ['recent-items'],
    queryFn: async () => {
      const { data } = await supabase
        .from('items')
        .select('*, containers(name)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5)
      return data
    },
    enabled: !!user,
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    )
  }

  if (!recentItems?.length) {
    return (
      <Card className="bg-backgroundSecondary border-border p-6 text-center">
        <Package className="w-12 h-12 text-textMuted mx-auto mb-3" />
        <p className="text-textSecondary">Нет недавних вещей</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {recentItems.map((item) => (
        <Link key={item.id} href={`/items/${item.id}`}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card className="bg-backgroundSecondary border-border hover:border-primary/50 transition-colors p-4 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-textPrimary">{item.name}</h4>
                    <p className="text-sm text-textSecondary">
                      {item.containers?.name || 'Без контейнера'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-textMuted">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">
                    {new Date(item.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
