"use client"

import { FC, useEffect, useRef } from "react"
import { CodingResponseType } from "@/db/tables"
import ReactMarkdown from "react-markdown"

import { convertTime } from "@/lib/convertTime"

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
            {message.role === "system" ? (
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="my-2 w-full overflow-auto  rounded-lg p-2">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, inline, ...props }) => (
                    <code className="rounded-lg bg-black/30 p-1" {...props} />
                  ),
                }}
                className="overflow-hidden text-sm leading-7"
              >
                {message.text || ""}
              </ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {convertTime(message.created_at)}
          </div>
        </div>
      ))}
    </div>
  )
}
