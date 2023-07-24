import { ThemeToggle } from '@/components/theme-toggle'

export default function Footer() {
  return (
    <header className="w-full border-t border-border flex flex-col">
      <div className="container flex justify-between w-full py-2">
          <div>
            <p className="text-sm text-muted-foreground">
                © 2023 Quanta. All rights reserved.
            </p>
              <p>Made by Luka Brkovic</p>
          </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
