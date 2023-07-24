import { ThemeToggle } from '@/components/theme-toggle'

export default function Footer() {
  return (
    <header className="w-full border-t border-border flex flex-col">
      <div className="container flex justify-end w-full py-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
