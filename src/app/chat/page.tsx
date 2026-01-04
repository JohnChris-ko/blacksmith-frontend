'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { Thread } from '@/components/thread'
import { StreamProvider } from '@/providers/Stream'
import { ThreadProvider } from '@/providers/Thread'
import { ArtifactProvider } from '@/components/thread/artifact'
import React from 'react'

export default function ChatPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="light">
      <React.Suspense fallback={<div>Loading...</div>}>
        <ThreadProvider>
          <StreamProvider>
            <ArtifactProvider>
              <Thread />
            </ArtifactProvider>
          </StreamProvider>
        </ThreadProvider>
      </React.Suspense>
    </div>
  )
}
