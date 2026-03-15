'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

interface QRCodeDisplayProps {
  value: string
  title?: string
}

export function QRCodeDisplay({ value, title = 'QR код' }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const svg = document.getElementById(`qr-${value}`)
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')

        const downloadLink = document.createElement('a')
        downloadLink.download = `qr-${value}.png`
        downloadLink.href = pngFile
        downloadLink.click()

        toast.success('QR код скачан')
      }

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Отсканируйте этот код для быстрого доступа
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <QRCodeSVG
          id={`qr-${value}`}
          value={value}
          size={200}
          level="H"
          includeMargin={true}
        />
        <Button onClick={handleDownload} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Скачать QR код
        </Button>
      </CardContent>
    </Card>
  )
}
