import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'
import { NewChatBtn } from '@/components/new-chat-btn'
import { Skeleton } from '@/components/ui/skeleton'

export default function CodeLoading() {
  return (
    <div className="px-4 xl:px-8 mt-4">
      <div className="flex flex-col justify-center  md:flex-row md:justify-between items-start">
        <Heading
          title="Conversation"
          description="Our most advanced conversation model."
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <NewChatBtn />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="p-2 h-[64px] border-black/5 w-full gap-0.5 flex flex-col items-start justify-between hover:shadow-md transition cursor-pointer bg-card shadow-sm rounded-md"
            key={i}
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
