'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ResetPasswordRequestForm from '@/components/auth/ResetPasswordRequestForm'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const [hasTokens, setHasTokens] = useState(false)

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    setHasTokens(!!(accessToken && refreshToken))
  }, [searchParams])

  if (hasTokens) {
    return <ResetPasswordForm />
  }

  return <ResetPasswordRequestForm />
}
