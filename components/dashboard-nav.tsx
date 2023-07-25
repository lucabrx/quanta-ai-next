'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Code,
  Hexagon,
  Home,
  Image,
  Languages,
  MessageSquare,
  Settings,
} from 'lucide-react'

const items = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Code',
    href: '/code',
    icon: Code,
  },
  {
    title: 'Image',
    href: '/image',
    icon: Image,
  },
  {
    title: 'Icons',
    href: '/icons',
    icon: Hexagon,
  },
  {
    title: 'Translators',
    href: '/translators',
    icon: Languages,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]
export function DashboardNav() {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent' +
	                ' hover:text-accent-foreground hover:bg-primary/10',
                  path === item.href ? 'dark:bg-accent bg-primary/10' : 'transparent',
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
