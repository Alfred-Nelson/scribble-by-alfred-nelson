import React, { useEffect, useState } from "react";

import { CategoriesApi } from "apis/categories";
import Article from "components/Form/Article";

const Create = () => {
  const [categoriesOptions, setCategoriesOptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");

  const fetchCategoryList = async () => {
    const response = await CategoriesApi.list();
    const categories = response.data.categories;
    const optionsToBe = categories.map(category => ({
      label: category.value,
      value: category.id,
    }));
    setCategoriesOptions(optionsToBe);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Article
      categoriesOptions={categoriesOptions}
      articleTitle={articleTitle}
      articleBody={articleBody}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      setArticleTitle={setArticleTitle}
      setArticleBody={setArticleBody}
    />
  );
};

export default Create;
