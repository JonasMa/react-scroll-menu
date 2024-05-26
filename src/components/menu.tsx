import React from "react";
import { MenuItemProps } from "./menuItem";

const defaultOptions: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "-15% 0px -55% 0px",
};

export interface MenuProps {
  children: React.ReactNode;
  root?: Element | Document;
  options?: IntersectionObserverInit;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onItemActive?: (sectionId: string) => void;
}

export const Menu = ({
  children,
  root = document,
  options = {},
  onItemActive,
  as = "ul",
  className,
}: MenuProps) => {

  const observerOptions: IntersectionObserverInit = {
    root,
    ...defaultOptions,
    ...options,
  };

  const [visibleSections, setVisibleSections] = React.useState<string[]>([]);
  const [allSections, setAllSections] = React.useState<string[]>([]);

  const updateSections = (add: string[], remove: string[]) => {
    setVisibleSections(sections => [...sections, ...add].filter(s => !remove.includes(s)));
  }

  React.useEffect(() => {
    if (visibleSections.length === 0) return;
    // TODO: convert visibleSections to Set to improve performance ???
    const visibleSectionsOrdered = allSections.filter(section => visibleSections.includes(section));
    onItemActive?.(visibleSectionsOrdered[0]);
  }, [visibleSections, allSections]);

  const callback: IntersectionObserverCallback = React.useCallback((entries) => {
    const intersectingIds =  entries.filter(e => e.isIntersecting).map(e => e.target.id);
    const notIntersectingIds =  entries.filter(e => !e.isIntersecting).map(e => e.target.id);
    updateSections(intersectingIds, notIntersectingIds);
  },[]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, observerOptions);
    const sections: string[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<MenuItemProps>(child)) return;

      const { sectionId } = child.props;
      sections.push(sectionId);
      const section = document.getElementById(sectionId);
      if (!section) {
        console.error(`No section found with id ${sectionId}`);
        return;
      }
      observer.observe(section);
    });
    setAllSections(sections);
  }, [callback]);

  const onItemClick = React.useCallback((sectionId: string) =>{
    onItemActive?.(sectionId);
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`No section found with id ${sectionId}`);
      return;
    }
    const top = section.offsetTop - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const childrenWithClickListener = React.Children.map(children, (child) => {
    if (React.isValidElement<MenuItemProps>(child)) {
      return React.cloneElement(child, {
        onItemClick: () => onItemClick(child.props.sectionId),
      });
    }
    return child;
  });
  return React.createElement(as, { className }, childrenWithClickListener);
};
