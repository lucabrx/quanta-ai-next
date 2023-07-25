import { Message } from '@/db/tables'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { ChatForm } from '@/components/chat/chat-form'
import { ChatMessages } from '@/components/chat/chat-messages'

export default async function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string }
}) {
  const chat = await db
    .select()
    .from(Message)
    .where(eq(Message.conversation_id, chatId))
    .orderBy(asc(Message.created_at))

  return (
    <main className="flex flex-col flex-1 px-0.5">
      <div className="  flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-144px)]  py-4">
        <ChatMessages chat={chat} />
        <ChatForm conversationId={chatId} />
      </div>
    </main>
  )
}
