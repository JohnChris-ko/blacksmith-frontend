'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth'
import type { Message } from '@/types/database'
import { updateConversationTimestamp } from './conversations'

export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<{id?: string, error?: string}> {
  try {
    const user = await requireAuth()

    // Validate role
    if (role !== 'user' && role !== 'assistant') {
      return { error: 'Invalid role' }
    }

    // Validate content
    const trimmedContent = content.trim()
    if (trimmedContent.length < 1) {
      return { error: 'Message cannot be empty' }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content: trimmedContent
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error adding message:', error)
      return { error: 'Conversation not found' }
    }

    // Update conversation timestamp
    await updateConversationTimestamp(conversationId)

    return { id: data.id }
  } catch (error) {
    console.error('Error adding message:', error)
    return { error: 'Unauthorized' }
  }
}
