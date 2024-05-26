import React from "react";

export interface MenuItemProps {
  sectionId: string;
  children: React.ReactNode;
  onItemClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onItemClick,
  as = "li",
  className,
}) => {
  return React.createElement(as, { className, onClick: onItemClick }, children);
};
