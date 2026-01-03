'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth'
import type { Conversation } from '@/types/database'

export async function createConversation(title: string): Promise<{id?: string, error?: string}> {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title: title
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating conversation:', error)
      return { error: 'Failed to create conversation' }
    }

    return { id: data.id }
  } catch (error) {
    console.error('Error creating conversation:', error)
    return { error: 'Unauthorized' }
  }
}

export async function getUserConversations(): Promise<Conversation[]> {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching conversations:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
}

export async function updateConversationTitle(
  conversationId: string,
  newTitle: string
): Promise<{success: boolean, error?: string}> {
  try {
    const user = await requireAuth()

    // Validate title
    const trimmedTitle = newTitle.trim()
    if (trimmedTitle.length < 1 || trimmedTitle.length > 100) {
      return { success: false, error: 'Title must be 1-100 characters' }
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('conversations')
      .update({ title: trimmedTitle })
      .eq('id', conversationId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error updating conversation title:', error)
      return { success: false, error: 'Conversation not found' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating conversation title:', error)
    return { success: false, error: 'Unauthorized' }
  }
}

export async function deleteConversation(
  conversationId: string
): Promise<{success: boolean, error?: string}> {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting conversation:', error)
      return { success: false, error: 'Conversation not found' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return { success: false, error: 'Unauthorized' }
  }
}

export async function updateConversationTimestamp(conversationId: string): Promise<void> {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId)
      .eq('user_id', user.id)
  } catch (error) {
    console.error('Error updating conversation timestamp:', error)
  }
}
