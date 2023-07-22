'use client'
import { Heading } from '@/components/ui/heading'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAllChats } from '@/hooks/use-all-chats'
import { nanoid } from 'nanoid'
import Link from 'next/link'
//TODO handle error if no chats and loading
export default function ConversationPage() {
  const router = useRouter()
  const { error, mutate, chats, isLoading } = useAllChats()
  const id = nanoid()

  async function submitNewConversation() {
    try {
      const res = await axios.get(`/api/conversation/new/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
      router.push(`/conversation/${id}`)
    }
  }

  if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

  console.log(Array.isArray(chats))

  return (
    <div className="px-4 xl:px-8 mt-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
        {chats?.map((item, i) => (
          <Link className="p-4 border-black/5 w-full flex items-center justify-between hover:shadow-md transition cursor-pointer bg-card shadow-sm rounded-md"  href={`/conversation/${item.id}`} key={i}>

              <div className="p-2 w-fit rounded-md bg-violet-500/10">
                <MessageSquare className="w-4 h-4 text-violet-500" />
              </div>
              <div className="font-semibold">
                {item.title}
                {item.title?.length === 15 && '...'}
              </div>
              <ArrowRight className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </div>
  )
}
