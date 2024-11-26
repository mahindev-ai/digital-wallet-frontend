'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/lib/api'

export default function Dashboard() {
  const [saldo, setSaldo] = useState(0)
  const [nombre, setNombre] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/accounts/getAccount')
        setNombre(response.data.email)
        setSaldo(response.data.current_balance)
      } catch (error) {
        console.error('Error al obtener datos del usuario', error)
        router.push('/login')
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Bienvenido, {nombre}</CardTitle>
            <CardDescription>Este es tu dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Saldo: ${saldo.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}