import { FC, ReactNode } from "react";
export interface MenuItemProps {
    sectionId: string;
    children: ReactNode;
    onItemClick?: () => void;
    className?: string;
}
export declare const MenuItem: FC<MenuItemProps>;
