import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { Coding } from '@/db/tables'
import { desc, eq } from 'drizzle-orm'
import { NewCodeBtn } from '@/components/code/new-code-btn'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function ChatPage() {
  const { userId } = auth()
  if (!userId) return null

  const codes = await db
    .select()
    .from(Coding)
    .orderBy(desc(Coding.created_at))
    .where(eq(Coding.user_id, userId))

  return (
    <main className="flex flex-col ">
      <div className="flex  items-center justify-between">
        <h2 className="text-xl md:text-2xl">Latest Code&apos;s 🧑‍💻</h2>
        <NewCodeBtn />
      </div>

      <div className=" mt-8 mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-4">
        {codes.map((item) => (
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
                href={`/code/${item.id}`}
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
