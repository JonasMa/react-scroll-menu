import { ReactNode } from "react";
export interface MenuProps {
    children: ReactNode;
    root?: Element | Document;
    options?: IntersectionObserverInit;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    onItemActive?: (sectionId: string) => void;
    paddingTop?: number;
}
export declare const Menu: ({ children, root, options, onItemActive, className, }: MenuProps) => import("react/jsx-runtime").JSX.Element;
