import {Button} from "@/components/ui/button";

export default function Home() {
  return (
  <main className="relative isolate md:pt-14 pt-8">
    <div className="absolute inset-x-0 -top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] element"></div>
    </div>
    <div className="md:py-20 md:mt-20 z-[100] px-4 lg:px-8">
      <div className="mx-auto mb-4 md:mb-10 max-w-4xl text-center">
        <h1 className="mb-3 md:mb-6 text-4xl sm:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c] to-[#645cd8]">
            Quanta
          </span>{' '}
           Next-Gen AI-tool for {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c] to-[#645cd8]"
          >Quanta</span
          >
        </h1>

        <p className="md:text-lg">
          <span className="hidden md:inline">Supercharge your productivity with Quanta - the</span>
          <span className="md:hidden inline">The</span> groundbreaking solution for every kind of  AI assist.
          Unlock the full potential of Quanta.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button size="lg" variant="default">Get Started</Button>
        <Button size="lg" variant="secondary">Learn More</Button>
      </div>
    </div>
  </main>
  )
}
