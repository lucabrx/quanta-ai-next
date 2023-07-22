'use client'
import Link from 'next/link'
import {
  Code,
  ImageIcon,
  Languages,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    href: '/image',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    href: '/code',
  },
  {
    label: 'Language Translation',
    icon: Languages,
    color: 'text-blue-600',
    href: '/translation',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-accent shadow-accent border-r border-r-border">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/"
          className="text-xl  md:text-[32px] font-bold bg-gradient-to-tl from-gray-800 to-pink-600 text-transparent bg-clip-text"
        >
          Quanta
        </Link>
        <div className="space-y-1 mt-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-foreground' +
                  ' hover:bg-primary/10 rounded-lg transition',
                pathname === route.href
                  ? 'text-primary bg-primary/10'
                  : 'text-primary/80',
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
