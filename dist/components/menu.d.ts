import React from "react";
export interface MenuProps {
    children: React.ReactNode;
    root?: Element | Document;
    options?: IntersectionObserverInit;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    onItemActive?: (sectionId: string) => void;
    paddingTop?: number;
}
export declare const Menu: ({ children, root, options, onItemActive, as, className, paddingTop, }: MenuProps) => React.ReactElement<{
    className: string | undefined;
}, string | React.JSXElementConstructor<any>>;
