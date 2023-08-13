import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { NewChatBtn } from "@/components/chat/new-chat-btn"

export default function ChatLoad() {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl">Latest Chat&apos;s 💬</h2>
        <NewChatBtn />
      </div>

      <div className=" mx-auto mt-8 grid w-full justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative w-full overflow-hidden rounded-lg border bg-background p-2 shadow"
          >
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[120px] w-full flex-col justify-between rounded-md p-6">
              <div className="w-full space-y-3">
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
              </div>
            </div>
            <div className="mb-2 mr-2 flex justify-end">
              <Button className="z-20 self-end">Talk with me</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
