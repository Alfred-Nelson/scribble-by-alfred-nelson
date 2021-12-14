import React from "react";

import CategoryList from "./CategoryList";

const SideBar = ({ categories, children }) => {
  return (
    <div className=" w-full flex">
      <aside className="mr-4 w-full h-screen sticky max-w-sm border-r-2 border-gray-300 ">
        <div className="ml-4 mr-4">
          <div className="mr-4 mt-10 w-full flex flex-col items-start">
            <CategoryList categories={categories} />
          </div>
        </div>
      </aside>

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
