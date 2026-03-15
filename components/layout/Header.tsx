'use client'

import { useOnlineStatus } from '@/hooks/use-online-status'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OnlineStatus() {
  const isOnline = useOnlineStatus()

  return (
    <div className={cn(
      'flex items-center gap-1 text-xs',
      isOnline ? 'text-green-600' : 'text-red-600'
    )}>
      {isOnline ? (
        <Wifi className="h-4 w-4" />
      ) : (
        <WifiOff className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{isOnline ? 'Онлайн' : 'Оффлайн'}</span>
    </div>
  )
}
