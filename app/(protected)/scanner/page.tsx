'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ScanLine } from 'lucide-react'

export default function ScannerPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null

    if (scanning) {
      scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      }, false)

      scanner.render(
        (decodedText) => {
          setScanning(false)
          toast.success(`QR код распознан: ${decodedText}`)
          // Переходим к контейнеру по ID из QR кода
          if (decodedText.startsWith('container:')) {
            const containerId = decodedText.replace('container:', '')
            router.push(`/container/${containerId}`)
          } else {
            // Пытаемся перейти по UUID
            router.push(`/container/${decodedText}`)
          }
        },
        (_error) => {
          // Игнорируем ошибки сканирования
        }
      )
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error)
      }
    }
  }, [scanning, router])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Сканер</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            Сканирование QR кодов
          </CardTitle>
          <CardDescription>
            Наведите камеру на QR код контейнера
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          {!scanning ? (
            <>
              <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                <ScanLine className="h-16 w-16 text-muted-foreground" />
              </div>
              <Button onClick={() => setScanning(true)}>
                Начать сканирование
              </Button>
            </>
          ) : (
            <>
              <div id="reader" className="w-full max-w-md"></div>
              <Button
                variant="outline"
                onClick={() => setScanning(false)}
                className="mt-4"
              >
                Остановить
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
