"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"

export default function ChatPage() {
  const [joke, setJoke] = useState<string>("")

  useEffect(() => {
    axios.get("api/joke").then((res) => {
      setJoke(res.data)
    })
  }, [])

  return (
    <main className="flex flex-col ">
      <div className="flex  items-center justify-between">
        <h2 className="text-xl md:text-2xl">Tell me a joke 💬</h2>
      </div>

      <div className="mx-auto flex items-center justify-center pt-8 md:pt-24">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
          <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
            <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
              {joke}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
