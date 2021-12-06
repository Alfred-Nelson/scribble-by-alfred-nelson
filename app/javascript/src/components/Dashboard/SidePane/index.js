import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import AddCategoryInput from "./AddCategoryInput";

const SidePane = ({
  tableInstance,
  categories,
  allArticlesLength,
  publishedArticlesLength,
  draftArticlesLength,
  fetchCategoryDetails,
}) => {
  const [activeStatusBlock, setActiveStatusBlock] = useState("All");
  const [activeCategoryBlock, setActiveCategoryBlock] = useState(null);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCategoryCollapsed, setIsAddCategoryCollapsed] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { setFilter } = tableInstance;

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories, isSearchCollapsed]);

  return (
    <MenuBar
      showMenu={true}
      title="Articles"
      className="sticky overflow-hidden"
    >
      <MenuBar.Block
        label="All"
        count={allArticlesLength}
        active={activeStatusBlock === "All"}
        onClick={() => {
          setActiveStatusBlock("All");
          setFilter("status", "");
        }}
      />
      <MenuBar.Block
        label="Published"
        count={publishedArticlesLength}
        active={activeStatusBlock === "Published"}
        onClick={() => {
          setActiveStatusBlock("Published");
          setFilter("status", "Published");
        }}
      />
      <MenuBar.Block
        label="Drafts"
        count={draftArticlesLength}
        active={activeStatusBlock === "Drafts"}
        onClick={() => {
          setActiveStatusBlock("Drafts");
          setFilter("status", "Draft");
        }}
      />

      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsSearchCollapsed(prev => !prev);
              setIsAddCategoryCollapsed(true);
            },
          },
          {
            icon: Plus,
            onClick: () => {
              setIsSearchCollapsed(true);
              setIsAddCategoryCollapsed(prev => !prev);
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        onCollapse={() => setIsSearchCollapsed(true)}
        onChange={e => {
          const filtered = categories.filter(category =>
            category.value.includes(e.target.value)
          );
          setFilteredCategories(filtered);
        }}
      />
      <AddCategoryInput
        isAddCategoryCollapsed={isAddCategoryCollapsed}
        setIsAddCategoryCollapsed={setIsAddCategoryCollapsed}
        fetchCategoryDetails={fetchCategoryDetails}
      />
      {filteredCategories.map((category, index) => (
        <MenuBar.Block
          key={index}
          label={category.value}
          count={category.article_count}
          active={activeCategoryBlock === category.value}
          onClick={() => {
            if (activeCategoryBlock !== category.value) {
              setActiveCategoryBlock(category.value);
              setFilter("category", category.value);
            } else {
              setActiveCategoryBlock("");
              setFilter("category", undefined);
            }
          }}
        />
      ))}
    </MenuBar>
  );
};

export default SidePane;
