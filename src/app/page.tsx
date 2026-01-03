'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { BlackSmithLogoSVG } from '@/components/icons/blacksmith'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, MessageSquare } from 'lucide-react'

export default function LandingPage() {
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

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'AI-Powered Conversations',
      description: 'Chat with advanced AI that understands context and provides intelligent responses.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Persistent History',
      description: 'Access your conversations anywhere. Your chat history is securely saved.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Fast & Responsive',
      description: 'Built with modern technology for lightning-fast responses.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 max-w-6xl w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <BlackSmithLogoSVG width={64} height={64} className="text-primary" />
              <h1 className="text-3xl font-bold">Blacksmith AI</h1>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl font-bold tracking-tight lg:text-6xl"
              >
                Build Smarter with{' '}
                <span className="text-primary">AI-Powered Chat</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Transform your ideas into reality with intelligent conversations that
                understand context and deliver results.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="text-lg"
                onClick={() => router.push('/signup')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-3xl"></div>

              {/* Chat UI Mockup */}
              <div className="relative bg-background border rounded-2xl shadow-2xl p-6 space-y-4 max-w-md">
                {/* Fake messages */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="bg-muted rounded-lg p-3 text-sm">
                        How can I help you build today?
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 text-sm max-w-xs">
                      Help me create a modern authentication system
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3 text-sm">
                        I'll help you build a secure auth system with Supabase. Let's start with...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input field mockup */}
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 h-10 bg-muted rounded-lg"></div>
                  <div className="w-10 h-10 bg-primary rounded-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">Why Choose Blacksmith AI?</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the next generation of AI-powered conversations with features designed for modern teams.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center space-y-8"
        >
          <h3 className="text-4xl font-bold">Ready to Get Started?</h3>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who are already building smarter with AI.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button
              size="lg"
              className="text-lg"
              onClick={() => router.push('/signup')}
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
