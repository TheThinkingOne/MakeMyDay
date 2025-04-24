import React from "react";
import BasicMenu from "../components/menus/BasicMenu";

function BasicLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <BasicMenu />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}

export default BasicLayout;
