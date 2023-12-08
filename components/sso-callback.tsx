"use client"

import * as React from "react"
import { useClerk } from "@clerk/nextjs"

import {Loader2} from "lucide-react";
import {SSOCallbackPageProps} from "@/app/(auth)/(routes)/sso-callback/page";

export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      aria-label="Loading"
      className="flex items-center justify-center"
    >
      <Loader2 className="h-16 w-16 animate-spin" aria-hidden="true" />
    </div>
  )
}
