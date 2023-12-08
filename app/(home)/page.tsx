"use client"

import Link from "next/link"

import { features, pricing } from "@/config/pricing"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="container flex-1 overflow-y-hidden">
      {/* color element */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-120px)] aspect-[1155/678] w-[300px] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:from-[#852950] dark:to-[#191464] dark:opacity-10 sm:left-[calc(50%-340px)] sm:w-[1200px] "></div>
      </div>

      {/* content */}
      <section className="xl:pt-42 space-y-6  pb-8 pt-20 md:pb-12 lg:py-36">
        <div className="container flex max-w-[1120px] flex-col items-center gap-4 text-center">
          <p className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Powered by OpenAI
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-br from-[#e64c8c] to-[#645cd8] bg-clip-text text-transparent">
              Quanta
            </span>{" "}
            Next-Gen AI-tool for daily use and{" "}
            <span className="bg-gradient-to-br from-[#e64c8c] to-[#645cd8] bg-clip-text text-transparent transition-opacity duration-200 ease-in-out">
              productivity.
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Supercharge your productivity with Quanta - the solution for every
            kind of AI assist. Unlock the full potential of Quanta.
          </p>

          <div className="space-x-4">
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/lucabrx?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container space-y-6  py-8 md:py-12 lg:py-24 "
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-2 shadow"
            >
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-10"></div>
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <feature.icon className="h-12 w-12 " />
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="container space-y-6  py-8 md:py-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            About
          </h2>
          <p className="max-w-full text-left leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Quanta is a next-gen AI-tool for daily use and productivity. Quanta
            is powered by OpenAI and is a solution for every kind of AI assist.
            Unlock the full potential of Quanta.
          </p>

          <p className="max-w-full text-left leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Quanta is programmed in TypeScript and uses Next.js as a framework.
            The frontend is built with TailwindCSS, with Drizzle and
            Planetscale, Clerk is used for authentication and Vercel for
            hosting.
          </p>
          <p className="max-w-full text-left leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is learning project and is not intended for commercial
            use, if there are any questions or problems, feel free to contact
            me, Iam open for any kind of feedback.
          </p>
        </div>
      </section>
    </main>
  )
}
