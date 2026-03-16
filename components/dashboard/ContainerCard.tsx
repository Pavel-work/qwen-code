'use client'

import { Container } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ContainerCardProps {
  container: Container
}

export function ContainerCard({ container }: ContainerCardProps) {
  return (
    <Link href={`/container/${container.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Card className="
          bg-backgroundSecondary border-border
          hover:border-primary/50 transition-colors
          p-4 cursor-pointer
        ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-textPrimary">
                  {container.name}
                </h3>
                <p className="text-sm text-textSecondary">
                  {container.description || 'Нет описания'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-textMuted" />
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
