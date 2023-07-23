import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ChatForm } from '@/components/chat-form'

export default function ConversationLoading() {
  return (
    <main className="flex flex-col flex-1">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between  h-full  max-h-[calc(100vh-160px)]">
        <div className="space-y-4  mb-6   h-fit overflow-y-auto  px-4 ">
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
                    ? 'bg-gray-100 text-gray-900 flex w-full'
                    : 'bg-violet-500 text-white flex w-full'
                }`}
              >
                <Skeleton
                  className={cn('h-4 w-3/4', i % 2 !== 0 && 'self-end')}
                />
                <Skeleton
                  className={cn('h-4 w-2/4', i % 2 !== 0 && 'self-end')}
                />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>

        <ChatForm conversationId="" />
      </div>
    </main>
  )
}
