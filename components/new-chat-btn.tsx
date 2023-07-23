'use client'

import { Button } from '@/components/ui/button'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const NewChatBtn = () => {
  const id = nanoid()
  const router = useRouter()
  function submitNewConversation() {
    try {
      return axios.get(`/api/conversation/new/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
      router.push(`/conversation/${id}`)
    }
  }

  return <Button onClick={submitNewConversation}>Start Conversation</Button>
}
