"use client"
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

const sentences = [
  'Chatbox for you',
  'Generating code for you',
  'Generating images for you',
    'And much more'
];


export default function Home() {
  const [currentSentence, setCurrentSentence] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const sentence = sentences[currentIndex];
      const nextChar = sentence[currentSentence.length];

      if (nextChar) {
        setCurrentSentence(prevSentence => prevSentence + nextChar);

        if (currentSentence.length >= sentence.length * 0.75) {
          setTypingSpeed(250);
        }
      } else {
        setCurrentIndex(prevIndex => (prevIndex + 1) % sentences.length);
        setCurrentSentence('');
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSentence, currentIndex, sentences,typingSpeed]);

  const length = Math.ceil(currentSentence.length * 0.6);
  const blackText = currentSentence.substring(0, length);
  const gradientText = currentSentence.substring(length);



  return (
  <main className="relative isolate md:pt-14 pt-8">
    <div className="absolute inset-x-0 -top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] element"></div>
    </div>
    <div className="py-20 mt-20 z-[100] px-4 lg:px-8">
      <div className="mx-auto mb-4 md:mb-10 max-w-4xl text-center">
        <h1 className=" text-4xl sm:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c] to-[#645cd8]">
            Quanta
          </span>{' '}
           Next-Gen AI-tool for {' '}
        </h1>
        <div className="mb-3 md:mb-4 h-16">
            <span className={cn("text-4xl sm:text-6xl text-foreground")}>{blackText}</span>
          <span className={cn("text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#e64c8c]" +
              " to-[#645cd8]")}>
         {gradientText}
        </span>
        </div>

        <p className="md:text-lg max-w-2xl mx-auto text-center">
          <span className="hidden md:inline">Supercharge your productivity with Quanta - the</span>
          <span className="md:hidden inline">The</span> groundbreaking solution for every kind of  AI assist.
          Unlock the full potential of Quanta.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link href="/dashboard" className={buttonVariants({
            size: "lg"
        })}>Get Started</Link>
        <Button size="lg" variant="secondary">Learn More</Button>
      </div>
    </div>
  </main>
  )
}
