import { type HandleOAuthCallbackParams } from "@clerk/types"

import SSOCallback from "@/components/sso-callback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <div className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </div>
  )
}
