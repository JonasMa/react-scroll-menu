import React from "react";
import { MenuItemProps } from "./menuItem";

const defaultOptions: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "-25% 0px -55% 0px",
};

export interface MenuProps {
  children: React.ReactNode;
  root?: Element;
  options?: IntersectionObserverInit;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onItemActive?: (sectionId: string) => void;
}

export const Menu = ({
  children,
  root,
  options = {},
  onItemActive,
  as = "ul",
  className,
}: MenuProps) => {
  // TODO: get click events and scroll to element

  const observerOptions: IntersectionObserverInit = {
    root: root || document,
    ...defaultOptions,
    ...options,
  };

  const [visibleSections, setVisibleSections] = React.useState<string[]>([]);

  const addSection = (section: string) => {
    setVisibleSections([...visibleSections, section]);
  };

  const removeSection = (section: string) => {
    setVisibleSections(visibleSections.filter((s) => s !== section));
  };

  React.useEffect(() => {
    if (visibleSections.length === 0) return;
    // TODO: This is a hack to have 'about' selected when in doubt
    const bestVisibility = visibleSections.sort()[0];
    // publish active id on output
    onItemActive?.(bestVisibility);
  }, [visibleSections]);

  React.useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addSection(entry.target.id);
        } else {
          removeSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(callback, observerOptions);
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<MenuItemProps>(child)) return;
      child.props.onClick = (sectionId: string) => {
        setVisibleSections([sectionId]);
      };

      const { sectionId } = child.props;
      // get child MenuItems
      const section = document.getElementById(sectionId);
      if (!section) {
        // throw new Error(`No section found with id ${sectionId}`);
        return;
      }
      observer.observe(section);
    });
  }, []);
  return React.createElement(as, { className }, children);
};
