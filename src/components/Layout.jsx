import React from "react";
import Navigations from "./Navigations";

const Layout = ({ children, isLoggedIn }) => {
  return (
    <div>
      <Navigations isLoggedIn={isLoggedIn} />
      {children}
    </div>
  );
};

export default Layout;
