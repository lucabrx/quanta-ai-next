"use client"
import { type OAuthStrategy } from "@clerk/types"
import { Icons } from "./icons"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSignIn } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

interface OAuthProviderType {
  name: string
  strategy: OAuthStrategy
  icon: keyof typeof Icons
}
const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Github", strategy: "oauth_github", icon: "github" },
] as OAuthProviderType[]
export function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function handleSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return
    try {
      setIsLoading(provider)
      await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      setIsLoading(null)

      //TODO handle error via toast
      console.log("OAUTH ERROR", error)
    }
  }
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void handleSignIn(provider.strategy)}
          >
            {isLoading === provider.strategy ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}

            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
