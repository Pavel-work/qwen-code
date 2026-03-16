'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  gradient: string
  trend?: {
    value: number
    positive: boolean
  }
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  icon: Icon,
  gradient,
  trend,
  onClick
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 cursor-pointer",
        "bg-gradient-to-br shadow-xl",
        gradient
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <span className={cn(
              "text-sm font-medium px-2 py-1 rounded-full",
              trend.positive ? "bg-green-500/20 text-green-100" : "bg-red-500/20 text-red-100"
            )}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </motion.div>
  )
}
