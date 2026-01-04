'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Bot, Shield, FileText } from 'lucide-react'
import Antigravity from '@/components/3d/Antigravity'
import ThemeToggle from '@/components/ui/theme-toggle'

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

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] overflow-hidden">
      {/* Antigravity Background */}
      <div className="absolute inset-0 -z-10">
        <Antigravity
          count={300}
          color="#8b5cf6"
          autoAnimate={true}
          particleShape="capsule"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="w-full px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚒️</span>
            <span className="text-xl font-bold text-white">BlacksmithAI</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold"
              asChild
            >
              <a href="/login">Get Started</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Security Testing
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Automate complete penetration testing lifecycles from reconnaissance to reporting with intelligent multi-agent orchestration
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-10 py-6 text-base"
              asChild
            >
              <a href="/login">Get Started</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-10 py-6 text-base"
              asChild
            >
              <a href="#video">Watch Demo</a>
            </Button>
          </motion.div>

          {/* Video Embed */}
          <motion.div
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            id="video"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 p-2">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube-nocookie.com/embed/vIUOOi3VB6Y"
                  title="BlacksmithAI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1: Multi-Agent Intelligence */}
            <motion.div
              className="p-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-lg border border-purple-500/30 bg-purple-500/10 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Multi-Agent Intelligence</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Specialized AI agents orchestrate complete penetration testing lifecycles from reconnaissance to post-exploitation
              </p>
            </motion.div>

            {/* Feature Card 2: Professional Tooling */}
            <motion.div
              className="p-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg border border-blue-500/30 bg-blue-500/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Professional Tooling</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Industry-standard security tools pre-configured in a controlled sandbox environment designed for AI agent execution
              </p>
            </motion.div>

            {/* Feature Card 3: Automated Reporting */}
            <motion.div
              className="p-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Automated Reporting</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Comprehensive security assessment reports generated automatically with evidence, findings, and actionable recommendations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Security Testing?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the future of automated penetration testing
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-12 py-6 text-base"
              asChild
            >
              <a href="/signup">Get Started</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
