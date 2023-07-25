import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Conversation } from '@/db/tables'
import { desc, eq } from 'drizzle-orm'
import { buttonVariants } from '@/components/ui/button'
import { NewChatBtn } from '@/components/chat/new-chat-btn'
import Link from 'next/link'

export default async function ChatPage() {
  const { userId } = auth()
  if (!userId) return null

  const chats = await db
    .select()
    .from(Conversation)
    .orderBy(desc(Conversation.created_at))
    .where(eq(Conversation.user_id, userId))

  return (
    <main className="flex flex-col ">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <h2 className="text-xl md:text-2xl">Latest Chat&apos;s 💬</h2>
        <NewChatBtn />
      </div>

      <div className=" mt-8 mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-4">
        {chats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden shadow rounded-lg border bg-background p-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">
                  {item.title}
                  {item.title && item.title.length > 14 && '...'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Latest GPT-3.5 model of Quanta UI.
                </p>
              </div>
            </div>
            <div className="flex justify-end mr-2 mb-2">
              <Link
                href={`/chat/${item.id}`}
                className={buttonVariants({
                  className: 'self-end z-20',
                })}
              >
                Talk with me
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
