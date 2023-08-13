"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Footer() {
  const path = usePathname()
  const noFooter =
    path !== "/chat" || "/code" || "/translate" || "/sign-in" || "/sign-up"
      ? "flex"
      : "hidden"
  console.log(path)
  return (
    <footer
      className={cn("w-full flex-col border-t  border-border/50", noFooter)}
    >
      <div className="container flex w-full justify-between py-2">
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
