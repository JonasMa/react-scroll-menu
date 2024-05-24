import React from "react";

export interface MenuItemProps {
  sectionId: string;
  children: React.ReactNode;
  onItemClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

// TODO: get click events and scroll to element
export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onItemClick,
  as = "li",
  className,
}) => {
  return React.createElement(as, { className, onClick: onItemClick }, children);
};
