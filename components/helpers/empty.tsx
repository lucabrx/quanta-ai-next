import {FC} from "react";

interface  EmptyProps {
    label: string;

}
export const Empty: FC<EmptyProps> = ({label}) => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    );
}