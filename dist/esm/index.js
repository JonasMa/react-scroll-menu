import { jsx } from 'react/jsx-runtime';
import { useState, useEffect, useCallback, Children, isValidElement, cloneElement } from 'react';

const defaultOptions = {
    rootMargin: "-25% 0px -55% 0px",
};
const Menu = ({ children, root, options = {}, onItemActive, className, }) => {
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [allSections, setAllSections] = useState([]);
    useEffect(() => {
        if (visibleSections.size === 0)
            return;
        const visibleSectionsOrdered = allSections.filter((section) => visibleSections.has(section));
        onItemActive?.(visibleSectionsOrdered[0]);
    }, [visibleSections, allSections]);
    const updateVisibleSections = useCallback((entries) => {
        setVisibleSections((oldSections) => {
            // Clone because state is immutable
            const newSections = new Set(oldSections);
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    newSections.add(e.target.id);
                }
                else {
                    newSections.delete(e.target.id);
                }
            });
            return newSections;
        });
    }, []);
    // Get all section ids from children and setup intersection observer
    useEffect(() => {
        const observerOptions = {
            root: root || document,
            ...defaultOptions,
            ...options,
        };
        const observer = new IntersectionObserver(updateVisibleSections, observerOptions);
        const sectionIds = [];
        Children.forEach(children, (child) => {
            if (!isValidElement(child))
                return;
            const { sectionId } = child.props;
            sectionIds.push(sectionId);
            const section = getSectionWithError(sectionId);
            if (!section) {
                return;
            }
            observer.observe(section);
        });
        setAllSections(sectionIds);
        return () => { };
    }, []);
    const childrenWithClickListener = Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                onItemClick: () => onItemActive?.(child.props.sectionId),
            });
        }
        return child;
    });
    return (jsx("nav", { className: className, children: jsx("ul", { children: childrenWithClickListener }) }));
};
function getSectionWithError(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`No section found with id ${sectionId}`);
    }
    return section;
}

const MenuItem = ({ children, className = "", sectionId, onItemClick, }) => {
    return (jsx("li", { className: className, onClick: () => onItemClick?.(), children: jsx("a", { href: `#${sectionId}`, children: children }) }));
};

export { Menu, MenuItem };
//# sourceMappingURL=index.js.map
