'use client'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const path = usePathname()
  const noFooter =
    path !== '/chat' || '/code' || '/translate' || '/sign-in' || '/sign-up'
      ? 'flex'
      : 'hidden'
  console.log(path)
  return (
    <footer
      className={cn('w-full border-t border-border/50  flex-col', noFooter)}
    >
      <div className="container flex justify-between w-full py-2">
        <div>
          <p className="text-sm text-muted-foreground">
            © 2023 Quanta. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made by Luka Brkovic</p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
