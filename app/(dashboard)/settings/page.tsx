import { UserProfile } from "@clerk/nextjs"

export default function SettingPage() {
  return (
    <main className="flex h-full flex-col justify-between">
      <div className="w-full py-4">
        <UserProfile />
      </div>
    </main>
  )
}
