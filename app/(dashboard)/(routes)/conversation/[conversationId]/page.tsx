import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'

import { ChatForm } from '@/components/chat-form'
import { db } from '@/lib/db'
import { Message } from '@/db/tables'
import { asc, eq } from 'drizzle-orm'
import { ChatMessages } from '@/components/chat-messages'

//TODO handle states on server and loading

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
    <main className="flex flex-col flex-1">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-160px)]">
        <ChatMessages chat={chat} />
        <ChatForm conversationId={conversationId} />
      </div>
    </main>
  )
}
