import { Heading } from '@/components/ui/heading'
import { Languages } from 'lucide-react'

export default function LanguagePage() {
  return (
    <main className="flex flex-col flex-1 items-start justify-start mx-8">
      <Heading
        title="Language Translation"
        description="Translate text from one language to another."
        icon={Languages}
        iconColor="text-blue-600"
        bgColor="bg-blue-600/10"
      />

      <div className="flex pb-48 flex-1 items-center justify-center w-full">
        <h2 className="text-7xl">Still Not Implemented</h2>
      </div>
    </main>
  )
}
