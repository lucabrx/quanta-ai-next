import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'

import { ChatForm } from '@/components/chat-form'
import { db } from '@/lib/db'
import { Message } from '@/db/tables'
import {asc, eq} from 'drizzle-orm'

function convertTime(time: Date) {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes} `
}



export default async function ConversationPage({
  params: { conversationId },
}: {
  params: { conversationId: string }
}) {
  const chat = await db
    .select()
    .from(Message)
    .where(eq(Message.conversation_id, conversationId))
    .orderBy(asc(Message.created_at))



  return (
    <main className="flex flex-col flex-1 ">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8 pt-4 flex-1 overflow-y-hidden">
        <div className="space-y-4 mt-4 mb-6   h-full overflow-y-auto p-4">
          {chat.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === 'system' ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.role === 'system'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-violet-500 text-white'
                }`}
              >
                {message.text}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {convertTime(message.created_at)}
              </div>
            </div>
          ))}
        </div>

          <ChatForm conversationId={conversationId} />

      </div>
    </main>
  )
}
