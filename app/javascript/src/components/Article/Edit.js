import React, { useEffect, useState } from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Callout } from "@bigbinary/neetoui/v2";
import { useParams, useHistory } from "react-router";

import { ArticlesApi } from "apis/articles";
import Article from "components/Form/Article";

const Edit = () => {
  const [categoriesOptions, setCategoriesOptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [statusAsPublished, setStatusAsPublished] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [hasError, setHasError] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  const fetchArticleDetails = async () => {
    const response = await ArticlesApi.show(id);
    const data = response.data;
    const optionsToBe = data.categories.map(category => ({
      label: category.value,
      value: category.id,
    }));
    setCategoriesOptions(optionsToBe);
    const correctOption = {
      label: data.article.category.value,
      value: data.article.category.id,
    };
    setSelectedCategory(correctOption);
    setArticleTitle(data.article.heading);
    setArticleBody(data.article.content);
  };

  const handleSubmit = async () => {
    if (articleTitle === "") {
      setHasError("Article title cannot be blank");
    } else if (Object.values(selectedCategory).length <= 0) {
      setHasError("Category was not selected");
    } else if (articleBody === "") {
      setHasError("Article body cannot be blank");
    } else {
      setHasError("");
      const payload = {
        heading: articleTitle,
        content: articleBody,
        status: statusAsPublished ? 1 : 0,
        category_id: selectedCategory.value,
      };
      try {
        await ArticlesApi.update(id, payload);
        history.push("/");
      } catch (e) {
        true;
      }
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  useEffect(() => {
    fetchArticleDetails();
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
        statusAsPublished={statusAsPublished}
        setStatusAsPublished={setStatusAsPublished}
        setSelectedCategory={setSelectedCategory}
        setArticleTitle={setArticleTitle}
        setArticleBody={setArticleBody}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Edit;
