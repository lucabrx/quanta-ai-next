'use client'
import ReactMarkdown from 'react-markdown'
import { convertTime } from '@/lib/convertTime'
import { CodingResponseType } from '@/db/tables'
import { FC, useEffect, useRef } from 'react'

interface CodingMessagesProps {
  chat: CodingResponseType[]
}
export const CodingMessages: FC<CodingMessagesProps> = ({ chat }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chat])

  return (
    <div
      ref={chatContainerRef}
      className="space-y-4  mb-6   h-fit overflow-y-auto  px-4 "
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
                ? 'bg-gray-200 text-gray-900'
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
                  code: ({ node, inline, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
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
  )
}
