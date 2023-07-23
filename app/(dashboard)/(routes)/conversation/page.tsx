import { Heading } from '@/components/ui/heading'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { NewChatBtn } from '@/components/new-chat-btn'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Conversation } from '@/db/tables'
import { desc, eq } from 'drizzle-orm'

//TODO handle error if no chats and loading
export default async function ConversationPage() {
  const { userId } = auth()

  //TODO handle this better
  if (!userId) return null

  const chats = await db
    .select()
    .from(Conversation)
    .orderBy(desc(Conversation.created_at))
    .where(eq(Conversation.user_id, userId))

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
        <NewChatBtn />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
        {chats?.map((item) => (
          <Link
            className="p-4 border-black/5 h-[64px] w-full flex items-center justify-between hover:shadow-md transition cursor-pointer bg-card shadow-sm rounded-md"
            href={`/conversation/${item.id}`}
            key={item.id}
          >
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
