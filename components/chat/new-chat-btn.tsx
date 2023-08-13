"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"

export const NewChatBtn = () => {
  const id = nanoid()
  const router = useRouter()
  function submitNewConversation() {
    try {
      return axios.get(`/api/conversation/new/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
      router.push(`/chat/${id}`)
    }
  }

  return <Button onClick={submitNewConversation}>New Conversation</Button>
}
