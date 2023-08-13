import { CodingResponse } from "@/db/tables"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { CodeForm } from "@/components/code/code-form"
import { CodeMessages } from "@/components/code/code-messages"

export default async function CodePage({
  params: { chatId },
}: {
  params: { chatId: string }
}) {
  const chats = await db
    .select()
    .from(CodingResponse)
    .where(eq(CodingResponse.coding_id, chatId))
    .orderBy(asc(CodingResponse.created_at))

  return (
    <main className="flex flex-1 flex-col px-0.5">
      <div className="  flex h-full max-h-[calc(100vh-144px)] flex-1 flex-col justify-between  py-4">
        <CodeMessages chat={chats} />
        <CodeForm codeId={chatId} />
      </div>
    </main>
  )
}
