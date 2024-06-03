import React from "react";
import { MenuItemProps } from "./menuItem";

const defaultOptions: IntersectionObserverInit = {
  rootMargin: "-25% 0px -55% 0px",
};

export interface MenuProps {
  children: React.ReactNode;
  root?: Element | Document;
  options?: IntersectionObserverInit;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onItemActive?: (sectionId: string) => void;
  paddingTop?: number;
}

export const Menu = ({
  children,
  root = document,
  options = {},
  onItemActive,
  as = "menu",
  className,
  paddingTop = 64,
}: MenuProps) => {
  const observerOptions: IntersectionObserverInit = {
    root,
    ...defaultOptions,
    ...options,
  };

  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(
    new Set()
  );
  const [allSections, setAllSections] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (visibleSections.size === 0) return;
    const visibleSectionsOrdered = allSections.filter((section) =>
      visibleSections.has(section)
    );
    onItemActive?.(visibleSectionsOrdered[0]);
  }, [visibleSections, allSections]);

  const updateVisibleSections: IntersectionObserverCallback = React.useCallback(
    (entries) => {
      setVisibleSections((oldSections) => {
        // Clone because state is immutable
        const newSections = new Set(oldSections);
        entries.forEach((e) => {
          if (e.isIntersecting) {
            newSections.add(e.target.id);
          } else {
            newSections.delete(e.target.id);
          }
        });
        return newSections;
      });
    },
    []
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      updateVisibleSections,
      observerOptions
    );
    const sectionIds: string[] = [];

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<MenuItemProps>(child)) return;

      const { sectionId } = child.props;
      sectionIds.push(sectionId);
      const section = getSectionWithError(sectionId);
      if (!section) {
        return;
      }
      observer.observe(section);
    });
    setAllSections(sectionIds);

    return () => {};
  }, [updateVisibleSections]);

  const onItemClick = React.useCallback((sectionId: string) => {
    onItemActive?.(sectionId);
    const section = getSectionWithError(sectionId);
    if (!section) {
      return;
    }
    const top = section.offsetTop - paddingTop;
    window.scrollTo({ top, behavior: "smooth" });
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

function getSectionWithError(sectionId: string): HTMLElement | null {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error(`No section found with id ${sectionId}`);
  }
  return section;
}
