import { ReactNode } from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col space-y-6 max-h-[100">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] mt-8">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
