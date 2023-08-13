import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatForm } from "@/components/chat/chat-form"

export default function ConversationLoading() {
  return (
    <main className="flex flex-1 flex-col px-0.5">
      <div className="  flex h-full max-h-[calc(100vh-144px)] flex-1 flex-col justify-between  py-4">
        <div className="mb-6  h-fit space-y-4 overflow-y-auto px-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 0 ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`flex w-[240px] flex-col gap-0.5 rounded-lg p-4 md:w-[280px] xl:w-[320px] ${
                  i % 2 === 0
                    ? "bg-primary/10 text-secondary-foreground dark:bg-secondary"
                    : "bg-primary text-neutral-50 dark:text-neutral-900 "
                }`}
              >
                <Skeleton
                  className={cn(
                    "h-4 w-3/4 animate-pulse dark:animate-none dark:bg-gray-900/30",
                    i % 2 !== 0 &&
                      "self-end" + " bg-gray-700 dark:bg-gray-900/30"
                  )}
                />
                <Skeleton
                  className={cn(
                    "h-4 w-2/4 animate-pulse dark:animate-none dark:bg-gray-900/30",
                    i % 2 !== 0 &&
                      "self-end" + " bg-gray-700 dark:bg-gray-900/30"
                  )}
                />
                <Skeleton
                  className={cn(
                    "h-4 w-full animate-pulse dark:animate-none dark:bg-gray-900/30",
                    i % 2 !== 0 && "self-end" + " bg-gray-700 "
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <ChatForm conversationId="" />
      </div>
    </main>
  )
}
