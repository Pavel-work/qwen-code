'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ScanLine, Settings, Tags } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/categories', label: 'Категории', icon: Tags },
  { href: '/search', label: 'Поиск', icon: Search },
  { href: '/scanner', label: 'Сканер', icon: ScanLine },
  { href: '/settings', label: 'Настройки', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full',
                'text-muted-foreground hover:text-foreground transition-colors',
                isActive && 'text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
