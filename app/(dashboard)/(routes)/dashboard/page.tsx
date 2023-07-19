'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { tools } from '@/config/tools'

export default function DashboardPage() {
  const router = useRouter()
  return (
    <main>
      <div className="mb-8 space-y-2 px-4 md:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold">
          Explore the power of Quanta
        </h2>
        <p className="text-muted-foreground font-light text-sm  ">
          Use our amazing AI for lots of use-cases
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </main>
  )
}
