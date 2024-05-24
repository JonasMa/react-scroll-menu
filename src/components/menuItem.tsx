import React, { MouseEventHandler } from "react";

export interface MenuItemProps {
  sectionId: string;
  children: React.ReactHTMLElement<HTMLElement>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onClick: (sectionId: string) => void;
}

  // TODO: get click events and scroll to element
export const MenuItem: React.FC<MenuItemProps> = ({ children, sectionId, onClick, as = 'li' }) => {
  // const element = React.createElement(as, { className }, children);
  const onChildClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    onClick(sectionId),

  }
  
  return React.cloneElement(children, { onClick: onChildClick } );
};
