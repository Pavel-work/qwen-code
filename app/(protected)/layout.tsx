'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'
import { Header } from '@/components/layout/Header'
import { useOnlineStatus } from '@/hooks/use-online-status'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const isOnline = useOnlineStatus()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:block fixed left-0 top-0 h-full bg-backgroundSecondary
        border-r border-border
        transition-all duration-300 z-40
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        <Sidebar collapsed={!sidebarOpen} />
      </aside>

      {/* Main Content */}
      <div className={`
        transition-all duration-300
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
      `}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {!isOnline && (
              <div className="bg-warning/20 border border-warning/50 text-warning text-center py-2 px-4 rounded-xl mb-4 text-sm">
                ⚠️ Оффлайн-режим. Изменения будут сохранены при подключении.
              </div>
            )}
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNav />
      </div>
    </div>
  )
}
