import React, { useEffect, useState, useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { useHistory } from "react-router";
import { useFilters, useGlobalFilter, useTable } from "react-table";

import { ArticlesApi } from "apis/articles";
import { CategoriesApi } from "apis/categories";
import SidePane from "components/Dashboard/SidePane";
import Table from "components/Table";
import ArticleFilterBar from "components/Table/ArticleFilterBar";
import { COLUMNS } from "constants/columns";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allArticlesLength, setAllArticlesLength] = useState(0);
  const [publishedArticlesLength, setPublishedArticlesLength] = useState(0);
  const [draftArticlesLength, setDraftArticlesLength] = useState(0);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => articles, [articles]);
  const history = useHistory();

  const handleClick = () => history.push("/article/new");

  const fetchArticleDetails = async () => {
    const response = await ArticlesApi.list();
    const articlesData = response.data.articles;
    setArticles(articlesData);
    setAllArticlesLength(articlesData.length);
    const published = articlesData.filter(
      record => record.status === "Published"
    ).length;
    setPublishedArticlesLength(published);
    const draft = articlesData.filter(
      record => record.status === "Draft"
    ).length;
    setDraftArticlesLength(draft);
  };

  const fetchCategoryDetails = async () => {
    const response = await CategoriesApi.list();
    setCategories(response.data.categories);
  };

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        id: "Edit",
        Cell: () => (
          <div className="flex">
            {columns
              .map(column => (column.isVisible ? "yes" : "no"))
              .filter(value => value === "yes").length > 0 ? (
              <>
                <Delete className="hover:text-red-400 mr-4 " size={18} />
                <Edit className="hover:text-indigo-600" size={21} />
              </>
            ) : null}
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    { columns, data },
    tableHooks,
    useGlobalFilter,
    useFilters
  );

  useEffect(() => {
    fetchArticleDetails();
    fetchCategoryDetails();
  }, []);

  return (
    <div className="flex">
      <SidePane
        tableInstance={tableInstance}
        categories={categories}
        allArticlesLength={allArticlesLength}
        publishedArticlesLength={publishedArticlesLength}
        draftArticlesLength={draftArticlesLength}
        fetchCategoryDetails={fetchCategoryDetails}
      />
      <div className="w-full">
        <ArticleFilterBar
          handleClick={handleClick}
          tableInstance={tableInstance}
          article={articles[0]}
        />
        <Table
          articles={articles}
          handleClick={handleClick}
          tableInstance={tableInstance}
        />
      </div>
    </div>
  );
};

export default Dashboard;
