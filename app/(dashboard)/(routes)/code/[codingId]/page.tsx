import { Heading } from '@/components/ui/heading'
import { Code } from 'lucide-react'

import { db } from '@/lib/db'
import { CodingResponse } from '@/db/tables'
import { asc, eq } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import { CodeForm } from '@/components/code-form'

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
      <div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-150px)] ">
        <div className="space-y-4  mb-6   h-fit overflow-y-auto  px-4 ">
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
                    : 'bg-green-700 text-white'
                }`}
              >
                {message.role === 'system' ? (
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-zinc-95o/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node,inline, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"


                  >
                    {String(message.text) || ''}
                  </ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {convertTime(message.created_at)}
              </div>
            </div>
          ))}
        </div>

        <CodeForm codingId={codingId} />
      </div>
    </main>
  )
}
