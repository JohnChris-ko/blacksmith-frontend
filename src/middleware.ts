import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  const publicRoutes = ['/', '/login', '/signup', '/reset-password', '/api/auth']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Update session and get user
  const { supabaseResponse, user } = await updateSession(request)

  // Protected routes: require auth
  const protectedRoutes = ['/chat', '/api/conversations', '/api/messages']
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    // Redirect to login if trying to access protected route without auth
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated user tries to access login/signup, redirect to chat
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/chat/:path*',
    '/api/conversations/:path*',
    '/api/messages/:path*',
    '/login',
    '/signup',
    '/reset-password',
    '/',
  ],
}
