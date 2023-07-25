'use client'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Webhook, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { SignOutButton } from '@clerk/nextjs'
import { navLinks } from '@/config/nav-links'
//TODO paths
export function Navbar({ userId }: { userId: string | null }) {
  const path = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const mobMenuRef = useRef<HTMLDivElement>(null)
  useClickOutside(mobMenuRef, () => setShowMobileMenu(false))
  const noNavbar =
    path !== '/chat' || '/code' || '/translate' || '/sign-in' || '/sign-up'
      ? 'flex'
      : 'hidden'
  const isNavbar =
    'chat' || 'code' || 'translate' || 'icon' || 'image' || 'joke'

  return (
    <header
      className={cn(
        'w-full border-b dark:border-border border-white/20 flex-col',
        noNavbar,
      )}
    >
      <div className="container flex justify-between w-full items-center py-2">
        <div className="flex gap-6 md:gap-10 justify-center items-center">
          <Link href="/" className="hidden items-center space-x-2 md:flex ">
            <Webhook className="text-[#e64c8c] " />
            <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c] to-[#645cd8]">
              Quanta
            </span>
          </Link>
          <nav className="hidden gap-3 md:flex">
            {navLinks?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  item.href === path ? 'text-foreground' : 'text-foreground/60',
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                isNavbar === path ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              Dashboard
            </Link>
          </nav>

          {/*<ThemeToggle />*/}
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Webhook />}
            <span className="font-bold">Menu</span>
          </button>

          {showMobileMenu && (
            <div
              className={cn(
                'fixed inset-0 top-10 z-50 grid h-[calc(100vh-48px)] grid-flow-row auto-rows-max' +
                  ' overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
              )}
            >
              <div
                ref={mobMenuRef}
                className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <Webhook className="text-[#e64c8c] " />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c] to-[#645cd8]">
                    Quanta
                  </span>
                </Link>
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                  {navLinks.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className={cn(
                        'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/dashboard"
                    className={cn(
                      'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                    )}
                  >
                    Dashboard
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
        {userId ? (
          <div className={buttonVariants()}>
            <SignOutButton />
          </div>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
