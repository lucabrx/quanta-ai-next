import Link from "next/link"

import { features } from "@/config/pricing"
import { buttonVariants } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-start">
        <h2 className="text-2xl md:text-3xl">Welcome to Quanta AI 🤖</h2>
      </div>

      <div className=" mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[1024px] lg:grid-cols-3">
        {features.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow"
          >
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
            <div className="flex h-[140px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="mb-2 mr-2 flex justify-end">
              <Link
                href={item.path!}
                className={buttonVariants({
                  className: "z-20 self-end",
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
