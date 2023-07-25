'use client'
import { MessageType } from '@/db/tables'
import { FC, useEffect, useRef } from 'react'
import { convertTime } from '@/lib/convertTime'

interface ChatMessagesProps {
  chat: MessageType[]
}
export const ChatMessages: FC<ChatMessagesProps> = ({ chat }) => {
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
            {message.text}
          </div>
          <div className="text-muted-foreground text-sm mt-1">
            {convertTime(message.created_at)}
          </div>
        </div>
      ))}
    </div>
  )
}
