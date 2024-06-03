import React from "react";
import { createRoot } from "react-dom/client";
import { Menu, MenuItem } from "../src/index.tsx";

const testOptions: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px", // No marging makes testing easier
};

const TestPage = () => {
  const [active, setActive] = React.useState<string>("");

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ position: "sticky", top: 0, maxHeight: "100vh" }}>
        <Menu
          paddingTop={0}
          options={testOptions}
          onItemActive={(name) => setActive(name)}
        >
          <MenuItem
            sectionId="one"
            className={active === "one" ? "active" : ""}
          >
            Item 1
          </MenuItem>
          <MenuItem
            sectionId="two"
            className={active === "two" ? "active" : ""}
          >
            Item 2
          </MenuItem>
          <MenuItem
            sectionId="three"
            className={active === "three" ? "active" : ""}
          >
            Item 3
          </MenuItem>
        </Menu>
      </div>
      <div style={{ overflowY: "auto", flexShrink: 0 }}>
        <h1 id="one">Section 1</h1>
        <section style={{ height: "150px" }}></section>
        <h1 id="two">Section 2</h1>
        <section style={{ height: "250px" }}></section>
        <h1 id="three">Section 3</h1>
        <section style={{ height: "100px" }}></section>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TestPage />
  </React.StrictMode>
);
