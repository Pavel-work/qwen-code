'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Boxes, Package, Search, ScanLine, Settings, Home, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/search', icon: Search, label: 'Поиск' },
  { href: '/scanner', icon: ScanLine, label: 'Сканер' },
  { href: '/containers/new', icon: Plus, label: 'Добавить' },
  { href: '/settings', icon: Settings, label: 'Настройки' },
]

interface SidebarProps {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "h-full bg-backgroundSecondary border-r border-border",
      "flex flex-col transition-all duration-300",
      collapsed ? "items-center" : "w-64"
    )}>
      {/* Логотип */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Boxes className="w-8 h-8 text-primary flex-shrink-0" />
          {!collapsed && (
            <span className="text-xl font-bold text-textPrimary">Склад</span>
          )}
        </div>
      </div>

      {/* Навигация */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-textSecondary hover:bg-secondary hover:text-textPrimary"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="activeSidebar"
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
