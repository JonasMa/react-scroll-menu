import React from "react";
export interface MenuItemProps {
    sectionId: string;
    children: React.ReactNode;
    onItemClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
}
export declare const MenuItem: React.FC<MenuItemProps>;
