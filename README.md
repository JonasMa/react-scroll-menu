# React Dynamic Scroll Menu

This is a dynamic menu which indicates which section on the page is currently scrolled into view. It updates automatically on scroll and can scroll sections into view when clicking on a menu item.

## Setup
We setup our `<Menu>` and link the sectionId to the header #id of the section.

```javascript
<Menu onItemActive={(id) => setSomeStyles(id)} >
    <MenuItem sectionId="one"> Item 1 </MenuItem>
    <MenuItem sectionId="two"> Item 2 </MenuItem>
    <MenuItem sectionId="three"> Item 3 </MenuItem>
</Menu>
<div>
    <h1 id="one">Section 1</h1>
    <section>...</section>
    <h1 id="two">Section 2</h1>
    <section>...</section>
    <h1 id="three">Section 3</h1>
    <section>...</section>
</div>
```

## Props
| Prop | Description|
| ---- | ---------- |
| as | `Menu` and `MenuItem` will be translated to `<menu>` and `<li>` elements in the DOM. You can override this with passing a HTML tag here. |
| root | In-view detection is done on the `document` by default. Customize if you want to have a more custom detection. |
| options | To override [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_options). Defaults to `rootMargin: "-25% 0px -55% 0px"`.  |
| paddingTop | Padding is added on top of the element when scrolling sections into view. Defaults to 64. |

## Notes
- No styling is done by this library. So you'll need to show the user the selection of the item by adding some conditional styles.
- When there are multiple sections inside the observed elements rootMargin, the topmost will be considered in view
