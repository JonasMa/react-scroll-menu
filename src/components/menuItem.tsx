import { FC, ReactNode } from "react";

export interface MenuItemProps {
  sectionId: string;
  children: ReactNode;
  onItemClick?: () => void;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  className = "",
  sectionId,
  onItemClick,
}) => {
  return (
    <li className={className} onClick={() => onItemClick?.()}>
      <a href={`#${sectionId}`}>{children}</a>
    </li>
  );
};
