import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ChatForm } from '@/components/chat/chat-form'

export default function ConversationLoading() {
  return (
    <main className="flex flex-col flex-1 px-0.5">
      <div className="  flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-144px)]  py-4">
        <div className="space-y-4  mb-6 h-fit overflow-y-auto px-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 0 ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`p-4 rounded-lg flex flex-col w-[240px] md:w-[280px] xl:w-[320px] gap-0.5 ${
                  i % 2 === 0
                    ? 'bg-primary/10 dark:bg-secondary text-secondary-foreground'
                    : 'bg-primary dark:text-neutral-900 text-neutral-50 '
                }`}
              >
                <Skeleton
                  className={cn(
                    'h-4 w-3/4 dark:animate-none animate-pulse dark:bg-gray-900/30',
                    i % 2 !== 0 &&
                      'self-end' + ' bg-gray-700 dark:bg-gray-900/30',
                  )}
                />
                <Skeleton
                  className={cn(
                    'h-4 w-2/4 dark:animate-none animate-pulse dark:bg-gray-900/30',
                    i % 2 !== 0 &&
                      'self-end' + ' bg-gray-700 dark:bg-gray-900/30',
                  )}
                />
                <Skeleton
                  className={cn(
                    'h-4 w-full dark:animate-none animate-pulse dark:bg-gray-900/30',
                    i % 2 !== 0 && 'self-end' + ' bg-gray-700 ',
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
