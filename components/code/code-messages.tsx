'use client'
import { CodingResponseType } from '@/db/tables'
import { FC, useEffect, useRef } from 'react'
import { convertTime } from '@/lib/convertTime'
import ReactMarkdown from 'react-markdown'

interface ChatMessagesProps {
  chat: CodingResponseType[]
}
export const CodeMessages: FC<ChatMessagesProps> = ({ chat }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chat])

  return (
    <div
      ref={chatContainerRef}
      className="space-y-4  mb-6 h-fit overflow-y-auto px-0.5"
    >
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
                ? 'bg-primary/10 dark:bg-secondary text-secondary-foreground'
                : 'bg-primary dark:text-neutral-900 text-neutral-50 '
            }`}
          >
            {message.role === 'system' ? (
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2  p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, inline, ...props }) => (
                    <code className="bg-black/30 rounded-lg p-1" {...props} />
                  ),
                }}
                className="text-sm overflow-hidden leading-7"
              >
                {message.text || ''}
              </ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
          <div className="text-muted-foreground text-sm mt-1">
            {convertTime(message.created_at)}
          </div>
        </div>
      ))}
    </div>
  )
}
