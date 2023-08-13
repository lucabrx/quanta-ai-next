"use client"

import { FC, useEffect, useRef } from "react"
import { MessageType } from "@/db/tables"

import { convertTime } from "@/lib/convertTime"

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
      className="mb-6  h-fit space-y-4 overflow-y-auto px-0.5"
    >
      {chat.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col ${
            message.role === "system" ? "items-start" : "items-end"
          }`}
        >
          <div
            className={`rounded-lg p-4 ${
              message.role === "system"
                ? "bg-primary/10 text-secondary-foreground dark:bg-secondary"
                : "bg-primary text-neutral-50 dark:text-neutral-900 "
            }`}
          >
            {message.text}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {convertTime(message.created_at)}
          </div>
        </div>
      ))}
    </div>
  )
}
