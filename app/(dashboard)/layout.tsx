import { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[60] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout