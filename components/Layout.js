import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      {!children?.props?.show && <Navbar />}
      {children?.props?.show ? <Sidebar children={children} /> : children}
      {!children?.props?.show && <Footer />}
    </>
  );
};

export default Layout;
