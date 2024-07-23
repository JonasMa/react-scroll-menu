import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  useCallback,
  ReactNode
} from "react";
import { MenuItemProps } from "./menuItem";

const defaultOptions: IntersectionObserverInit = {
  rootMargin: "-25% 0px -55% 0px",
};

export interface MenuProps {
  children: ReactNode;
  root?: Element | Document;
  options?: IntersectionObserverInit;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onItemActive?: (sectionId: string) => void;
  paddingTop?: number;
}

export const Menu = ({
  children,
  root,
  options = {},
  onItemActive,
  className,
}: MenuProps) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [allSections, setAllSections] = useState<string[]>([]);

  useEffect(() => {
    if (visibleSections.size === 0) return;
    const visibleSectionsOrdered = allSections.filter((section) =>
      visibleSections.has(section)
    );
    onItemActive?.(visibleSectionsOrdered[0]);
  }, [visibleSections, allSections]);

  const updateVisibleSections: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
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

  // Get all section ids from children and setup intersection observer
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: root || document,
      ...defaultOptions,
      ...options,
    };
    const observer = new IntersectionObserver(
      updateVisibleSections,
      observerOptions
    );
    const sectionIds: string[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement<MenuItemProps>(child)) return;

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
  }, []);

  const childrenWithClickListener = Children.map(children, (child) => {
    if (isValidElement<MenuItemProps>(child)) {
      return cloneElement(child, {
        onItemClick: () => onItemActive?.(child.props.sectionId),
      });
    }
    return child;
  });
  return (
    <nav className={className}>
      <ul>{childrenWithClickListener}</ul>
    </nav>
  );
};

function getSectionWithError(sectionId: string): HTMLElement | null {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error(`No section found with id ${sectionId}`);
  }
  return section;
}
