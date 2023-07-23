import { UserButton } from '@clerk/nextjs'
import { MessageSquare } from 'lucide-react'
import { Heading } from '@/components/ui/heading'

export default function SettingsPage() {
  return (
    <main className="flex flex-col flex-1 items-start justify-start mx-8">
      <Heading
        title="Settings"
        description="Manage your account settings."
        icon={MessageSquare}
        iconColor="text-zinc-900"
        bgColor="bg-zinc-900/10"
      />
      <UserButton />
    </main>
  )
}
