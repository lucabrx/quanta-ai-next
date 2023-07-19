import {FC} from "react";

interface ShouldRenderProps {
    children: React.ReactNode;
    if: unknown;
}

export const ShouldRender: FC<ShouldRenderProps> = ({children, if: condition}) => {
    return <> {condition && children} </>

}