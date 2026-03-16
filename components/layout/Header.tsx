'use client'

import { useState } from 'react'
import { Menu, Bell, User, Home, Search, ScanLine, Plus, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Гамбургер меню - везде */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-textSecondary hover:text-textPrimary"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

          <div>
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
              className="absolute top-full left-0 right-0 bg-backgroundSecondary border-b border-border z-30"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl",
                          "text-textSecondary hover:bg-secondary hover:text-textPrimary",
                          "transition-colors"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
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
