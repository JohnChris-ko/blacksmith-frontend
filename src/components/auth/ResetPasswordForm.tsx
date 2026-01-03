'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import Antigravity from '@/components/3d/Antigravity'
import { Loader2 } from 'lucide-react'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})

  useEffect(() => {
    // Check for access_token and refresh_token in URL
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')

    if (accessToken && refreshToken) {
      // Set the session
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ data, error }) => {
        if (error || !data.session) {
          toast.error('Invalid or expired reset link')
          setTimeout(() => {
            router.push('/reset-password')
          }, 3000)
        } else {
          setIsValidSession(true)
        }
      })
    } else {
      // No tokens in URL, user needs to request reset email
      toast.error('Please request a password reset link first')
      setTimeout(() => {
        router.push('/reset-password')
      }, 2000)
    }
  }, [searchParams, supabase, router])

  const validateForm = () => {
    const newErrors: {
      password?: string
      confirmPassword?: string
    } = {}

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else {
      // Check for at least one letter and one number
      const hasLetter = /[a-zA-Z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
      if (!hasLetter || !hasNumber) {
        newErrors.password =
          'Password must contain at least one letter and one number'
      }
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        toast.error(error.message || 'Failed to update password')
        setLoading(false)
        return
      }

      toast.success('Password updated successfully')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      toast.error('An unexpected error occurred')
      setLoading(false)
    }
  }

  if (!isValidSession) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Antigravity
            count={300}
            color="#2F6868"
            autoAnimate={true}
            particleShape="capsule"
          />
        </div>
        <Card className="w-full max-w-md mx-4 bg-background/90 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Verifying reset link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Animation Background */}
      <div className="absolute inset-0 -z-10">
        <Antigravity
          count={300}
          color="#2F6868"
          autoAnimate={true}
          particleShape="capsule"
        />
      </div>

      {/* Reset Password Card */}
      <Card className="w-full max-w-md mx-4 bg-background/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Set New Password
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Enter your new password below
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <PasswordInput
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrors({ ...errors, password: undefined })
                }}
                disabled={loading}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setErrors({ ...errors, confirmPassword: undefined })
                }}
                disabled={loading}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
