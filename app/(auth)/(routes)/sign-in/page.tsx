import { OAuthSignIn } from "@/components/o-auth-sign-in"
import Link from "next/link";
import {CredentialsSignIn} from "@/components/credentials-sign-in";

export default function SignInPage() {
  return (
    <div className="border-border border bg-card p-8 md:p-12 rounded-md h-fit w-fit space-y-4 shadow">
      <div className="space-y-1">
        <h2 className="text-2xl">Sign in</h2>
        <p className="text-muted-foreground">
          Choose your preferred sign in method
        </p>
      </div>
      <div className="grid gap-4">
        <OAuthSignIn />
          <div className="relative">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
              </div>
          </div>
          <CredentialsSignIn />
      </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
                <Link
                    aria-label="Sign up"
                    href={"/sign-up"}
                    className="text-primary underline-offset-4 transition-colors hover:underline"
                >
                    Sign up
                </Link>
            </div>
            <Link
                aria-label="Reset password"
                href={"/sign-in/reset-password"}
                className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
            >
                Reset password
            </Link>
        </div>
    </div>
  )
}
