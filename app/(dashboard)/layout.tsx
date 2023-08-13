import { ReactNode } from "react"

import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-h-[100 flex flex-1 flex-col space-y-6">
      <div className="container mt-8 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
