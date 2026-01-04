'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, Target, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function PreferencesPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [saving, setSaving] = useState(false)

  // Preference state
  const [occupation, setOccupation] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const occupationOptions = [
    { value: 'security-professional', label: 'Security Professional', icon: '🛡️' },
    { value: 'developer', label: 'Developer / Engineer', icon: '💻' },
    { value: 'manager', label: 'Manager / Team Lead', icon: '👔' },
    { value: 'consultant', label: 'Consultant', icon: '💼' },
    { value: 'researcher', label: 'Researcher / Student', icon: '🔬' },
    { value: 'other', label: 'Other', icon: '👤' }
  ]

  const companySizeOptions = [
    { value: 'solo', label: 'Just Me (Solo)', icon: '1️⃣' },
    { value: '2-10', label: '2-10 employees', icon: '👥' },
    { value: '11-50', label: '11-50 employees', icon: '🏢' },
    { value: '51-200', label: '51-200 employees', icon: '🏭' },
    { value: '201-1000', label: '201-1000 employees', icon: '🌆' },
    { value: '1000+', label: '1000+ employees', icon: '🌍' }
  ]

  const reasonOptions = [
    { value: 'security-testing', label: 'Security Testing', icon: '🔐' },
    { value: 'compliance', label: 'Compliance / Audit', icon: '📋' },
    { value: 'learning', label: 'Learning / Education', icon: '📚' },
    { value: 'research', label: 'Research', icon: '🔍' },
    { value: 'automation', label: 'Automation', icon: '⚡' },
    { value: 'other', label: 'Other', icon: '💡' }
  ]

  const handleSave = async () => {
    if (!occupation || !companySize || !reason) {
      toast.error('Please select all options')
      return
    }

    setSaving(true)

    // TODO: Save to Supabase - separate table for user preferences
    // Example structure:
    // user_preferences table:
    // - user_id (FK to auth.users)
    // - occupation
    // - company_size
    // - reason
    // - created_at
    // - updated_at

    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Preferences saved!')
    router.push('/chat')
  }

  const handleSkip = () => {
    router.push('/chat')
  }

  return (
    <div className="light min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to BlacksmithAI!</h1>
          <p className="text-gray-600">Help us personalize your experience (optional)</p>
        </div>

        <div className="space-y-8">
          {/* Occupation */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-500" />
                <CardTitle>What best describes your role?</CardTitle>
              </div>
              <CardDescription>This helps us tailor features to your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {occupationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOccupation(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      occupation === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <p className="text-sm font-medium text-gray-900">{option.label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Size */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <CardTitle>Company / Team Size</CardTitle>
              </div>
              <CardDescription>How many people are in your organization?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {companySizeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCompanySize(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      companySize === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <p className="text-sm font-medium text-gray-900">{option.label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reason */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                <CardTitle>What brings you to BlacksmithAI?</CardTitle>
              </div>
              <CardDescription>Your primary use case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {reasonOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setReason(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      reason === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <p className="text-sm font-medium text-gray-900">{option.label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-600"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !occupation || !companySize || !reason}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
            >
              {saving ? 'Saving...' : 'Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
