export default function LoadingPage() {
  return (
    <main className="flex flex-col ">
      <div className="flex  items-center justify-between">
        <h2 className="text-xl md:text-2xl">Loading...</h2>
      </div>

      <div className="mx-auto flex items-center justify-center pt-8 md:pt-24">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
          <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
            <div className="h-4 w-4 animate-spin" />
          </div>
        </div>
      </div>
    </main>
  )
}
