import React from "react";

import { Accordion, Typography } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const CategoryList = ({ categories }) => {
  return (
    <div className="w-full">
      <Accordion>
        {categories.map((category, categoryIndex) => (
          <Accordion.Item
            key={categoryIndex}
            title={<b>{category.value}</b>}
            className="border-none"
          >
            {category.articles.map((article, articleIndex) => (
              <NavLink
                key={articleIndex}
                to={`/public/${article.slug}`}
                activeClassName="text-indigo-600"
              >
                <Typography className="ml-10">{article.heading}</Typography>
              </NavLink>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default CategoryList;
