'use client'
import { Heading } from '@/components/ui/heading'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConversationPage() {
  const [id, setId] = useState('')
  const router = useRouter()

  async function submitNewConversation() {
    try {
      const res = await axios.get('/api/conversation/new')
      setId(res.data.conversationId)

      router.push(`/conversation/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  console.log(id)
  return (
    <main className="px-4 xl:px-8 mt-4">
      <div className="flex flex-col justify-center  md:flex-row md:justify-between items-start">
        <Heading
          title="Conversation"
          description="Our most advanced conversation model."
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <Button onClick={submitNewConversation}>Start Conversation</Button>
      </div>

      <div className="flex flex-wrap gap-4 xl:gap-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card
            key={i}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center flex-col gap-x-4">
              <div className="p-2 w-fit rounded-md bg-violet-500/10">
                <MessageSquare className="w-8 h-8 text-violet-500" />
              </div>
              <div className="font-semibold">Amazing Ai title</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </main>
  )
}
