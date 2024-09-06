import React from "react";

function Navbar({ children }) {
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default Navbar;
