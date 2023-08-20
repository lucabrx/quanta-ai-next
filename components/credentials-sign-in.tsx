import {Button} from "@/components/ui/button";

export function CredentialsSignIn() {
    return <form>
    <div className="pt-2 space-y-1">
        <label htmlFor="email" className="block  font-medium ">
            Email address
        </label>
        <input type="text" name="email" id="email" autoComplete="email"
               className="rounded-md w-full border border-border bg-primary/10 px-4  py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input"
        />
    </div>
        <div className="pt-2 space-y-1">
            <label htmlFor="password" className="block  font-medium ">
                Password
            </label>
            <input type="password" name="password" id="password" autoComplete="current-password"
                   className="rounded-md w-full border border-border bg-primary/10 px-4  py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input"

            />
        </div>

        <Button type="submit"  className="w-full py-2 mt-4">
            Sign in
        </Button>
    </form>
}