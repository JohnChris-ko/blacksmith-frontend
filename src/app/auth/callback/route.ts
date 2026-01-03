import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/chat'

  if (code) {
    const supabase = await createClient()

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(
          new URL('/login?error=auth_failed', request.url)
        )
      }

      return NextResponse.redirect(new URL(redirectTo, request.url))
    } catch (error) {
      console.error('Error during OAuth callback:', error)
      return NextResponse.redirect(
        new URL('/login?error=auth_failed', request.url)
      )
    }
  }

  // No code parameter, redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
}
