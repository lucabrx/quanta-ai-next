import Link from "next/link"
import { Conversation } from "@/db/tables"
import { auth } from "@clerk/nextjs"
import { desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { buttonVariants } from "@/components/ui/button"
import { NewChatBtn } from "@/components/chat/new-chat-btn"

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
      <div className="flex  items-center justify-between">
        <h2 className="text-xl md:text-2xl">Latest Chat&apos;s 💬</h2>
        <NewChatBtn />
      </div>

      <div className=" mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-4">
        {chats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow"
          >
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">
                  {item.title}
                  {item.title && item.title.length > 14 && "..."}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Latest GPT-3.5 model of Quanta UI.
                </p>
              </div>
            </div>
            <div className="mb-2 mr-2 flex justify-end">
              <Link
                href={`/chat/${item.id}`}
                className={buttonVariants({
                  className: "z-20 self-end",
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
