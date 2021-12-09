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
  const [onDeleteChanges, setOnDeleteChanges] = useState(null);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => articles, [articles]);
  const history = useHistory();

  const handleClick = () => history.push("/article/new");

  const fetchArticleDetails = async () => {
    const response = await ArticlesApi.list();
    const data = response.data;
    const articlesData = data.articles;
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
    setCategories(data.categories);
  };

  const fetchCategoryDetails = async () => {
    const response = await CategoriesApi.list();
    setCategories(response.data.categories);
  };

  const handleDelete = async (id, value) => {
    const r = confirm(`Are you sure to delete the article "${value}"`);
    if (r) {
      setOnDeleteChanges(id);
      await ArticlesApi.destroy(id);
    }
  };

  const handleOnDeleteChanges = () => {
    let statusOfArticleToBeRemoved;
    let articleCategory;
    const newArticles = articles.filter(article => {
      if (article.id === onDeleteChanges) {
        statusOfArticleToBeRemoved = article.status;
        articleCategory = article.category;
      }

      return article.id !== onDeleteChanges;
    });
    if (statusOfArticleToBeRemoved === "Published") {
      setPublishedArticlesLength(prev => prev - 1);
    } else {
      setDraftArticlesLength(prev => prev - 1);
    }
    const categoryToBe = categories.map(category => {
      if (category.value === articleCategory) {
        return {
          value: category.value,
          article_count: category.article_count - 1,
        };
      }

      return { value: category.value, article_count: category.article_count };
    });
    setCategories(categoryToBe);
    setAllArticlesLength(prev => prev - 1);
    setArticles(newArticles);
    setOnDeleteChanges(null);
  };

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        id: "Edit",
        Cell: ({ row }) => (
          <div className="flex">
            {columns
              .map(column => (column.isVisible ? "yes" : "no"))
              .filter(value => value === "yes").length > 0 ? (
              <>
                <Delete
                  className="hover:text-red-400 mr-4 "
                  size={18}
                  onClick={() =>
                    handleDelete(row.original.id, row.original.heading)
                  }
                />
                <Edit
                  className="hover:text-indigo-600"
                  size={21}
                  onClick={() =>
                    history.push(`/article/${row.original.id}/edit`)
                  }
                />
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
    if (onDeleteChanges) {
      handleOnDeleteChanges();
    }
  }, [onDeleteChanges]);

  useEffect(() => {
    fetchArticleDetails();
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
