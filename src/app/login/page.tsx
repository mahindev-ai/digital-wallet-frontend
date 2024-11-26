'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      const response = await api.post('api/accounts/login', { mobile, password })
      console.log('hola:', response)
      if (response.data.token) {
        // Establecer la cookie para que expire en 1 hora
        router.push('/dashboard')
      } else {
        setError('Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error en la autenticación', error)
      setError('Hubo un error al intentar iniciar sesión')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a tu billetera digital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Número de Celular</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Ingresa tu número de celular"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <Button className="mt-6 w-full" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="link" className="text-sm text-gray-600 hover:text-gray-800">
            ¿Olvidaste tu contraseña?
          </Button>
          <div className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Button variant="link" className="p-0 text-sm text-blue-600 hover:text-blue-800" onClick={() => router.push('/registro')}>
              Regístrate
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

