"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"

export const NewCodeBtn = () => {
  const router = useRouter()
  const id = nanoid()

  async function submitNewCodingConversation() {
    try {
      return await axios.get(`/api/coding/new/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
      router.push(`/code/${id}`)
    }
  }
  return (
    <Button
      aria-label="create new code chat"
      onClick={() => void submitNewCodingConversation()}
    >
      New Code Helper
    </Button>
  )
}
