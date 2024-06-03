

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

var React = require('react');

const defaultOptions = {
    threshold: 0,
    rootMargin: "-25% 0px -55% 0px",
};
const Menu = ({ children, root = document, options = {}, onItemActive, as = "ul", className, paddingTop = 64, }) => {
    const observerOptions = {
        root,
        ...defaultOptions,
        ...options,
    };
    const [visibleSections, setVisibleSections] = React.useState(new Set());
    const [allSections, setAllSections] = React.useState([]);
    React.useEffect(() => {
        if (visibleSections.size === 0)
            return;
        const visibleSectionsOrdered = allSections.filter((section) => visibleSections.has(section));
        onItemActive?.(visibleSectionsOrdered[0]);
    }, [visibleSections, allSections]);
    const updateVisibleSections = React.useCallback((entries) => {
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
    React.useEffect(() => {
        const observer = new IntersectionObserver(updateVisibleSections, observerOptions);
        const sectionIds = [];
        React.Children.forEach(children, (child) => {
            if (!React.isValidElement(child))
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
    }, [updateVisibleSections]);
    const onItemClick = React.useCallback((sectionId) => {
        onItemActive?.(sectionId);
        const section = getSectionWithError(sectionId);
        if (!section) {
            return;
        }
        const top = section.offsetTop - paddingTop;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);
    const childrenWithClickListener = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onItemClick: () => onItemClick(child.props.sectionId),
            });
        }
        return child;
    });
    return React.createElement(as, { className }, childrenWithClickListener);
};
function getSectionWithError(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`No section found with id ${sectionId}`);
    }
    return section;
}

const MenuItem = ({ children, onItemClick, as = "li", className, }) => {
    return React.createElement(as, { className, onClick: onItemClick }, children);
};

exports.Menu = Menu;
exports.MenuItem = MenuItem;
//# sourceMappingURL=index.js.map
