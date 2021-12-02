import React, { useEffect, useState } from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Callout } from "@bigbinary/neetoui/v2";

import { CategoriesApi } from "apis/categories";
import Article from "components/Form/Article";

const Create = () => {
  const [categoriesOptions, setCategoriesOptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [hasError, setHasError] = useState(null);

  const fetchCategoryList = async () => {
    const response = await CategoriesApi.list();
    const categories = response.data.categories;
    const optionsToBe = categories.map(category => ({
      label: category.value,
      value: category.id,
    }));
    setCategoriesOptions(optionsToBe);
  };

  const handleSubmit = () => {
    if (articleTitle === "") {
      setHasError("Article title cannot be blank");
    } else if (Object.values(selectedCategory).length <= 0) {
      setHasError("Category was not selected");
    } else if (articleBody === "") {
      setHasError("Article body cannot be blank");
    } else {
      setHasError("");
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      {hasError ? (
        <div className="ml-5 mt-5">
          <Callout style="warning" icon={Warning}>
            {hasError}
          </Callout>
        </div>
      ) : null}
      <Article
        categoriesOptions={categoriesOptions}
        articleTitle={articleTitle}
        articleBody={articleBody}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setArticleTitle={setArticleTitle}
        setArticleBody={setArticleBody}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Create;
