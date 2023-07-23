import { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full relative min-h-screen">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[60] bg-gray-900">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <Navbar />
        <div className="md:pt-8"> {children} </div>
      </div>
    </div>
  )
}

export default DashboardLayout
