'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Bell, User, Home, Search, ScanLine, Plus, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  onToggleSidebar: () => void
}

const menuItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/search', icon: Search, label: 'Поиск' },
  { href: '/scanner', icon: ScanLine, label: 'Сканер' },
  { href: '/containers/new', icon: Plus, label: 'Добавить' },
  { href: '/settings', icon: Settings, label: 'Настройки' },
]

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = (href: string) => {
    setMenuOpen(false)
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div>
          <h1 className="text-lg font-semibold text-textPrimary">Склад</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Гамбургер меню - справа */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border border-border"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

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

      {/* Выпадающее меню */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Выпадающая панель */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full right-0 z-50 rounded-bl-xl"
              style={{ 
                pointerEvents: 'auto',
                backgroundColor: 'rgb(145, 193, 245)',
                border: '1px solid rgb(51, 65, 85)'
              }}
            >
              <nav className="p-4 space-y-2 min-w-[200px]">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.href}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(item.href)
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl",
                        "text-textSecondary hover:bg-background hover:text-textPrimary",
                        "transition-colors cursor-pointer"
                      )}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
