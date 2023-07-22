'use client'
import { Heading } from '@/components/ui/heading'
import { ArrowRight, Code, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useAllCoding } from '@/hooks/use-all-coding'

//TODO handle error if no chats and loading
//TODO change coding to code in api
export default function ConversationPage() {
  const router = useRouter()
  const { error, mutate, chats, isLoading } = useAllCoding()
  const id = nanoid()

  async function submitNewCodingConversation() {
    try {
      const res = await axios.get(`/api/coding/new/${id}`)
    } catch (e) {
      console.log(e)
    } finally {
      router.push(`/code/${id}`)
    }
  }

  return (
    <div className="px-4 xl:px-8 mt-4">
      <div className="flex flex-col justify-center  md:flex-row md:justify-between items-start">
        <Heading
          title="Code"
          description="Our most advanced code helper."
          icon={Code}
          iconColor="text-green-700"
          bgColor="bg-green-700/10"
        />
        <Button onClick={submitNewCodingConversation}>New Code Helper</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
        {chats.map((item) => (
          <Link href={`/code/${item.id}`} key={item.id} className="p-4 border-black/5 w-full flex items-center justify-between hover:shadow-md transition cursor-pointer bg-card shadow-sm rounded-md" >
              <div className="p-2 w-fit rounded-md bg-green-700/10">
                <Code className="w-4 h-4 text-green-700" />
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
