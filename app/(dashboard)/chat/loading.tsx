import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { NewChatBtn } from '@/components/chat/new-chat-btn'

export default function ChatLoad() {
  return (
    <div className="flex flex-col ">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <h2 className="text-xl md:text-2xl">Latest Chat&apos;s 💬</h2>
        <NewChatBtn />
      </div>

      <div className=" mt-8 mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-4 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden shadow rounded-lg border bg-background p-2 w-full"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[120px] w-full flex-col justify-between rounded-md p-6">
              <div className="space-y-3 w-full">
                <Skeleton className="w-full h-[20px]" />
                <Skeleton className="w-full h-[20px]" />
                <Skeleton className="w-full h-[20px]" />
              </div>
            </div>
            <div className="flex justify-end mr-2 mb-2">
              <Button className="self-end z-20">Talk with me</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
