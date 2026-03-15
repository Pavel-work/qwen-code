'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Введите email для сброса пароля')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Инструкции по сбросу пароля отправлены на вашу почту')
      }
    } catch (err) {
      toast.error('Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Валидация
    if (password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов')
      setLoading(false)
      return
    }

    try {
      const result = isLogin
        ? await signIn(email, password)
        : await signUp(email, password)

      if (result.error) {
        toast.error(result.error.message || 'Ошибка аутентификации')
      } else {
        toast.success(isLogin ? 'Вход выполнен!' : 'Регистрация успешна!')
        // Используем window.location для полной перезагрузки страницы
        window.location.href = '/'
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>GarageOS</CardTitle>
          <CardDescription>
            {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {isLogin && (
              <Button
                type="button"
                variant="ghost"
                className="w-full h-auto text-sm text-muted-foreground"
                onClick={handleResetPassword}
                disabled={loading || !email}
              >
                Забыли пароль?
              </Button>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
          <Button
            variant="link"
            className="w-full mt-4"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
