'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';


export default function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    document_id: '',
    mobile: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accounts/register`, formData)
      if (response.data.success) {
        Cookies.set('authToken', response.data.token);

        router.push('/dashboard')
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar usuario')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crear una cuenta</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus datos para registrarte en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-describedby="name-error"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  aria-describedby="lastname-error"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document_id">Número de Documento</Label>
              <Input
                id="document_id"
                name="document_id"
                value={formData.document_id}
                onChange={handleChange}
                required
                aria-describedby="document-error"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Número de Celular</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                type="tel"
                aria-describedby="mobile-error"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-describedby="email-error"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-describedby="password-error"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
            <Button className="w-full mt-6" type="submit">
              Registrarse
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="mt-2 text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Button variant="link" className="p-0" onClick={() => router.push('/login')}>
              Inicia sesión
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}