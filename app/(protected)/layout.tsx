'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { BottomNav } from '@/components/layout/BottomNav'
import { useOnlineStatus } from '@/hooks/use-online-status'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const isOnline = useOnlineStatus()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Регистрация Service Worker (отключено до готовности)
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/sw.js')
  //       .catch(console.error)
  //   }
  // }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen pb-16">
      {!isOnline && (
        <div className="bg-yellow-500 text-white text-center py-2 text-sm">
          ⚠️ Оффлайн-режим. Изменения будут сохранены при подключении.
        </div>
      )}
      {children}
      <BottomNav />
    </div>
  )
}
