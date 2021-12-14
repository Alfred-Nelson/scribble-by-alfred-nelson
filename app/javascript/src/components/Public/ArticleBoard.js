import React, { useEffect, useState } from "react";

import { Typography, Tag } from "@bigbinary/neetoui/v2";
import { format } from "date-fns";
import { useParams } from "react-router";

import { PublicArticleApi } from "apis/public/articles";

const ArticleBoard = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});

  const fetchArticleDetails = async () => {
    const response = await PublicArticleApi.getArticle(slug);
    setArticle(response.data.article);
  };

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  return (
    <div className="mx-10 mt-10">
      <div className="w-full h-600 p-5 overflow-y-scroll">
        <Typography style="h1" className="mb-2">
          {" "}
          {article?.heading}{" "}
        </Typography>
        <div className="flex">
          <Tag
            color="blue"
            label={<p className="text-indigo-600">{article?.category}</p>}
            style="solid"
          />
          {article?.updated_at && (
            <Typography className="ml-5 mt-1" style="body2">
              {format(new Date(article.updated_at), "dd MMMM, yyyy")}
            </Typography>
          )}
        </div>
        <Typography style="body2" className="mt-4 whitespace-pre-wrap">
          {" "}
          {article?.content}{" "}
        </Typography>
      </div>
    </div>
  );
};

export default ArticleBoard;
