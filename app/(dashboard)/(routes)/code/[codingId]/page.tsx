import { Heading } from '@/components/ui/heading'
import { Code } from 'lucide-react'

import { db } from '@/lib/db'
import { CodingResponse } from '@/db/tables'
import { asc, eq } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import { CodeForm } from '@/components/code-form'
import { CodingMessages } from '@/components/coding-messages'

function convertTime(time: Date) {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes} `
}

//TODO handle states on server and loading
//TODO add optimstic update
// Todo add error handling and loading on send message

export default async function ChatPage({
  params: { codingId },
}: {
  params: { codingId: string }
}) {
  const chat = await db
    .select()
    .from(CodingResponse)
    .where(eq(CodingResponse.coding_id, codingId))
    .orderBy(asc(CodingResponse.created_at))

  return (
    <main className="flex flex-col flex-1 ">
      <Heading
        title="Code "
        description="Our most advanced coding helper."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between h-full  max-h-[calc(100vh-160px)] ">
        <CodingMessages chat={chat} />
        <CodeForm codingId={codingId} />
      </div>
    </main>
  )
}
