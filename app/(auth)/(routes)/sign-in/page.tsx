import { OAuthSignIn } from "@/components/o-auth-sign-in"

export default function SignInPage() {
  return (
    <div className="border-border border bg-card p-8 md:p-12 rounded-md h-fit w-fit space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl">Sign in</h2>
        <p className="text-muted-foreground">
          Choose your preferred sign in method
        </p>
      </div>
      <div className="grid gap-4">
        <OAuthSignIn />
      </div>
    </div>
  )
}
