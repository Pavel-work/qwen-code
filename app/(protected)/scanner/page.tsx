'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Html5Qrcode } from 'html5-qrcode'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ScanLine, Camera, CameraOff } from 'lucide-react'

export default function ScannerPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [permission, setPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  // Проверка разрешений при загрузке
  useEffect(() => {
    async function checkPermission() {
      try {
        if (navigator.permissions) {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName })
          setPermission(result.state === 'granted')
          result.onchange = () => setPermission(result.state === 'granted')
        } else {
          setPermission(null) // Браузер не поддерживает API разрешений
        }
      } catch {
        setPermission(null)
      }
    }
    checkPermission()
  }, [])

  // Запуск сканера
  useEffect(() => {
    if (!scanning) {
      // Остановка сканера при выходе из режима сканирования
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error)
        scannerRef.current = null
      }
      return
    }

    async function startScanner() {
      try {
        setError(null)
        
        // Получаем список камер
        const cameras = await Html5Qrcode.getCameras()
        
        if (!cameras || cameras.length === 0) {
          setError('Камеры не найдены')
          setScanning(false)
          return
        }

        // Инициализируем сканер
        scannerRef.current = new Html5Qrcode('reader')
        
        // Выбираем заднюю камеру если есть
        const backCamera = cameras.find(cam => 
          cam.label.toLowerCase().includes('back') || 
          cam.label.toLowerCase().includes('environment')
        ) || cameras[0]

        // Запускаем сканирование
        await scannerRef.current.start(
          backCamera.id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            setScanning(false)
            toast.success(`QR код распознан: ${decodedText}`)
            
            if (decodedText.startsWith('container:')) {
              const containerId = decodedText.replace('container:', '')
              router.push(`/container/${containerId}`)
            } else {
              router.push(`/container/${decodedText}`)
            }
          },
          (_error) => {
            // Игнорируем ошибки сканирования (это нормально)
          }
        )
      } catch (err: any) {
        console.error('Ошибка запуска сканера:', err)
        
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('Нет доступа к камере. Разрешите доступ в настройках браузера')
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError('Камера не найдена')
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          setError('Камера занята другим приложением')
        } else {
          setError(`Ошибка: ${err.message || err}`)
        }
        setScanning(false)
      }
    }

    startScanner()

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error)
        scannerRef.current = null
      }
    }
  }, [scanning, router])

  const handleStartScan = async () => {
    // Запрашиваем доступ к камере
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setScanning(true)
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Нет доступа к камере. Разрешите доступ в настройках браузера')
      } else {
        setError(`Ошибка доступа к камере: ${err.message}`)
      }
      setPermission(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-textPrimary mb-4">QR Сканер</h1>

      <Card className="bg-backgroundSecondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-textPrimary">
            <ScanLine className="h-5 w-5" />
            Сканирование QR кодов
          </CardTitle>
          <CardDescription className="text-textSecondary">
            Наведите камеру на QR код контейнера
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          {!scanning ? (
            <>
              <div className="w-64 h-64 bg-secondary rounded-lg flex items-center justify-center mb-4 border border-border">
                {permission === false ? (
                  <CameraOff className="h-16 w-16 text-textMuted" />
                ) : (
                  <Camera className="h-16 w-16 text-primary" />
                )}
              </div>
              
              {error && (
                <div className="bg-destructive/20 border border-destructive/50 text-destructive px-4 py-3 rounded-xl mb-4 text-sm text-center">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleStartScan}
                className="bg-primary hover:bg-primary/90"
              >
                <Camera className="w-4 h-4 mr-2" />
                Начать сканирование
              </Button>

              {permission === false && (
                <p className="text-sm text-textMuted mt-4 text-center">
                  Разрешите доступ к камере в настройках браузера
                </p>
              )}
            </>
          ) : (
            <>
              <div 
                id="reader" 
                className="w-full max-w-md rounded-lg overflow-hidden border border-border"
              ></div>
              <Button
                variant="outline"
                onClick={() => {
                  setScanning(false)
                  setError(null)
                }}
                className="mt-4"
              >
                <CameraOff className="w-4 h-4 mr-2" />
                Остановить
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Инструкция */}
      <Card className="mt-4 bg-backgroundSecondary border-border">
        <CardHeader>
          <CardTitle className="text-textPrimary">Как использовать</CardTitle>
        </CardHeader>
        <CardContent className="text-textSecondary text-sm space-y-2">
          <p>1. Нажмите &quot;Начать сканирование&quot;</p>
          <p>2. Разрешите доступ к камере</p>
          <p>3. Наведите QR код на область сканирования</p>
          <p>4. После распознавания откроется контейнер</p>
        </CardContent>
      </Card>
    </div>
  )
}
