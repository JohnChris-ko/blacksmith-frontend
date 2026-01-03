'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import Antigravity from '@/components/3d/Antigravity'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ResetPasswordRequestForm() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setError('Email is required')
      return false
    } else if (!emailRegex.test(email)) {
      setError('Invalid email format')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail()) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        toast.error(error.message || 'Failed to send reset link')
        setLoading(false)
        return
      }

      toast.success('Check your email for reset link')
      setEmail('')
      setLoading(false)
    } catch (error) {
      toast.error('An unexpected error occurred')
      setLoading(false)
    }
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

      {/* Reset Password Request Card */}
      <Card className="w-full max-w-md mx-4 bg-background/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1">
          <button
            onClick={() => router.push('/login')}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </button>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Enter your email and we'll send you a reset link
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                disabled={loading}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
