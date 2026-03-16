'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon, LogOut, Camera, Check, X, AlertTriangle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  // Проверка разрешений при загрузке
  useEffect(() => {
    checkCameraPermission()
  }, [])

  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: 'camera' as PermissionName })
        setCameraPermission(result.state === 'granted')
        
        result.onchange = () => {
          setCameraPermission(result.state === 'granted')
        }
      } else {
        // Проверяем через попытку доступа
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach(track => track.stop())
        setCameraPermission(true)
      }
    } catch {
      setCameraPermission(false)
    }
  }

  const requestCameraAccess = async () => {
    setLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Задняя камера
        } 
      })
      
      // Останавливаем поток сразу после проверки
      stream.getTracks().forEach(track => track.stop())
      
      setCameraPermission(true)
      toast.success('Доступ к камере разрешён!')
    } catch (err: any) {
      console.error('Ошибка доступа к камере:', err)
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        toast.error('Доступ к камере запрещён. Разрешите в настройках браузера')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        toast.error('Камера не найдена на устройстве')
      } else {
        toast.error(`Ошибка: ${err.message}`)
      }
      setCameraPermission(false)
    } finally {
      setLoading(false)
    }
  }

  const openBrowserSettings = () => {
    // Открываем настройки сайта в браузере
    toast.info('Нажмите на иконку замка 🔒 в адресной строке → Настройки сайта')
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-textPrimary mb-4">Настройки</h1>

      {/* Профиль */}
      <Card className="bg-backgroundSecondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-textPrimary">
            <SettingsIcon className="h-5 w-5" />
            Профиль
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-textSecondary">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>ID:</strong> {user?.id}</p>
          </div>
        </CardContent>
      </Card>

      {/* Разрешения */}
      <Card className="bg-backgroundSecondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-textPrimary">
            <Camera className="h-5 w-5" />
            Разрешения
          </CardTitle>
          <CardDescription className="text-textSecondary">
            Управление доступом к функциям устройства
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Камера */}
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                cameraPermission === true 
                  ? 'bg-green-500/20' 
                  : cameraPermission === false 
                  ? 'bg-red-500/20' 
                  : 'bg-yellow-500/20'
              }`}>
                {cameraPermission === true ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : cameraPermission === false ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-textPrimary">Камера</p>
                <p className="text-sm text-textSecondary">
                  {cameraPermission === true 
                    ? 'Разрешено' 
                    : cameraPermission === false 
                    ? 'Запрещено' 
                    : 'Не определено'}
                </p>
              </div>
            </div>
            <Switch
              checked={cameraPermission === true}
              onCheckedChange={requestCameraAccess}
              disabled={loading}
            />
          </div>

          {/* Кнопки действий */}
          {cameraPermission === false && (
            <div className="space-y-2">
              <Button 
                onClick={requestCameraAccess} 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                <Camera className="w-4 h-4 mr-2" />
                {loading ? 'Запрос...' : 'Разрешить камеру'}
              </Button>
              <Button 
                variant="outline" 
                onClick={openBrowserSettings}
                className="w-full border-border text-textSecondary hover:text-textPrimary"
              >
                Открыть настройки браузера
              </Button>
            </div>
          )}

          {cameraPermission === null && (
            <Button 
              onClick={requestCameraAccess} 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              <Camera className="w-4 h-4 mr-2" />
              {loading ? 'Проверка...' : 'Проверить доступ'}
            </Button>
          )}

          {/* Подсказка */}
          <div className="text-xs text-textMuted bg-background p-3 rounded-lg border border-border">
            <p className="font-medium mb-1">💡 Как предоставить доступ:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Нажмите «Разрешить камеру»</li>
              <li>В диалоге браузера выберите «Разрешить»</li>
              <li>Если запретили — нажмите «Открыть настройки браузера»</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Приложение */}
      <Card className="bg-backgroundSecondary border-border">
        <CardHeader>
          <CardTitle className="text-textPrimary">Приложение</CardTitle>
          <CardDescription className="text-textSecondary">
            Управление приложением
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-border text-textSecondary hover:text-destructive hover:border-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
