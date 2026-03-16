'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function CategoryChart() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<number[]>([])
  const [chartLabels, setChartLabels] = useState<string[]>([])

  useEffect(() => {
    async function loadChartData() {
      if (!user) return

      // Загружаем категории
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name, color')
        .eq('user_id', user.id)

      // Загружаем вещи
      const { data: itemsData } = await supabase
        .from('items')
        .select('category_id')
        .eq('user_id', user.id)

      const categoryCount = (categoriesData || []).map(cat => ({
        name: cat.name,
        color: cat.color,
        count: itemsData?.filter(i => i.category_id === cat.id).length || 0,
      }))

      setChartLabels(categoryCount.map(c => c.name))
      setChartData(categoryCount.map(c => c.count))
      setLoading(false)
    }

    loadChartData()
  }, [user])

  if (loading) {
    return <Skeleton className="h-64 rounded-xl" />
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    labels: chartLabels,
    colors: chartLabels.map((_, i) => [
      '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'
    ][i % 5]),
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true },
            value: { show: true },
            total: {
              show: true,
              label: 'Всего',
              formatter: () => chartData.reduce((a, b) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
  }

  return (
    <div className="bg-backgroundSecondary border border-border rounded-2xl p-4">
      <ReactApexChart
        options={options}
        series={chartData}
        type="donut"
        height={240}
      />
    </div>
  )
}
