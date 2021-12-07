import React, { useEffect } from "react";

import { useParams } from "react-router";

import { ArticlesApi } from "apis/articles";

const Edit = () => {
  const { id } = useParams();

  const fetchArticleDetails = async () => {
    const response = await ArticlesApi.show(id);
    const data = response.data;
    data;
  };

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  return <div>Hello</div>;
};

export default Edit;
