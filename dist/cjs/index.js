var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const defaultOptions = {
    rootMargin: "-25% 0px -55% 0px",
};
const Menu = ({ children, root, options = {}, onItemActive, className, }) => {
    const [visibleSections, setVisibleSections] = react.useState(new Set());
    const [allSections, setAllSections] = react.useState([]);
    react.useEffect(() => {
        if (visibleSections.size === 0)
            return;
        const visibleSectionsOrdered = allSections.filter((section) => visibleSections.has(section));
        onItemActive?.(visibleSectionsOrdered[0]);
    }, [visibleSections, allSections]);
    const updateVisibleSections = react.useCallback((entries) => {
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
    react.useEffect(() => {
        const observerOptions = {
            root: root || document,
            ...defaultOptions,
            ...options,
        };
        const observer = new IntersectionObserver(updateVisibleSections, observerOptions);
        const sectionIds = [];
        react.Children.forEach(children, (child) => {
            if (!react.isValidElement(child))
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
    const childrenWithClickListener = react.Children.map(children, (child) => {
        if (react.isValidElement(child)) {
            return react.cloneElement(child, {
                onItemClick: () => onItemActive?.(child.props.sectionId),
            });
        }
        return child;
    });
    return (jsxRuntime.jsx("nav", { className: className, children: jsxRuntime.jsx("ul", { children: childrenWithClickListener }) }));
};
function getSectionWithError(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`No section found with id ${sectionId}`);
    }
    return section;
}

const MenuItem = ({ children, className = "", sectionId, onItemClick, }) => {
    return (jsxRuntime.jsx("li", { className: className, onClick: () => onItemClick?.(), children: jsxRuntime.jsx("a", { href: `#${sectionId}`, children: children }) }));
};

exports.Menu = Menu;
exports.MenuItem = MenuItem;
//# sourceMappingURL=index.js.map
