import { Skeleton } from '@/components/ui/skeleton'

export default function ChatLoad() {
  return (
    <main className="flex flex-col ">
      <div className="flex  items-center justify-between">
        <h2 className="text-xl md:text-2xl">Tell me a joke 💬</h2>
      </div>

      <div className="pt-8 md:pt-24 mx-auto flex justify-center items-center">
        <div className="relative overflow-hidden shadow rounded-lg border bg-background p-2">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
          <div className="flex h-[120px] w-[200px] flex-col justify-between rounded-md p-6">
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-3/4 h-[20px]" />
          </div>
        </div>
      </div>
    </main>
  )
}
