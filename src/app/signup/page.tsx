'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import SignupForm from '@/components/auth/SignupForm'

export default function SignupPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (user && !loading) {
      router.push('/chat')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return <SignupForm />
}
