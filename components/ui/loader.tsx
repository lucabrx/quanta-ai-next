import {Loader2} from "lucide-react";

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin"/>
            <p className="text-sm text-muted-foreground">
                Generating, please wait...
            </p>
        </div>
    );
};