'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ScanLine, Plus, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/search', icon: Search, label: 'Поиск' },
  { href: '/scanner', icon: ScanLine, label: 'Сканер' },
  { href: '/containers/new', icon: Plus, label: 'Добавить' },
  { href: '/settings', icon: Settings, label: 'Настройки' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-backgroundSecondary border-t border-border px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 p-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon className={cn(
                "w-6 h-6 relative z-10",
                isActive ? "text-primary" : "text-textMuted"
              )} />
              <span className={cn(
                "text-xs relative z-10",
                isActive ? "text-primary font-medium" : "text-textMuted"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
