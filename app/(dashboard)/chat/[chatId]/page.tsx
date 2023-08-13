import { Message } from "@/db/tables"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { ChatForm } from "@/components/chat/chat-form"
import { ChatMessages } from "@/components/chat/chat-messages"

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
    <main className="flex flex-1 flex-col px-0.5">
      <div className="  flex h-full max-h-[calc(100vh-144px)] flex-1 flex-col justify-between  py-4">
        <ChatMessages chat={chat} />
        <ChatForm conversationId={chatId} />
      </div>
    </main>
  )
}
