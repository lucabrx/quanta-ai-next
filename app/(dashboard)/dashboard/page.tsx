import { features } from '@/config/pricing'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-start">
        <h2 className="text-2xl md:text-3xl">Welcome to Quanta AI 🤖</h2>
      </div>

      <div className=" mt-8 mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-3">
        {features.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden shadow rounded-lg border bg-background p-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[140px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex justify-end mr-2 mb-2">
              <Link
                href={item.path!}
                className={buttonVariants({
                  className: 'self-end z-20',
                })}
              >
                Generate
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
