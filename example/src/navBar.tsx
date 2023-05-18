import { NavLink } from "react-router-dom";

import "./style/App.css";
import React from "react";

export function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink  to="react-pdf-highlighter/highlights">
        Higlights
      </NavLink>
      {/* <NavLink to="/about">About</NavLink> */}
      {/* <NavLink to="/contact">Contact</NavLink> */}
    </nav>
  );
}
