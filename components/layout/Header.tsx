'use client'

import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:flex hidden text-textSecondary hover:text-textPrimary"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="lg:hidden">
            <h1 className="text-lg font-semibold text-textPrimary">Склад</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-textSecondary hover:text-textPrimary">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
            <User className="w-5 h-5 text-textSecondary" />
            <span className="text-sm text-textSecondary hidden sm:inline">
              {user?.email?.split('@')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
