import React from "react";

import {
  Input,
  Button,
  Select,
  Textarea,
  Dropdown,
} from "@bigbinary/neetoui/v2";

const Article = ({
  categoriesOptions,
  articleTitle,
  articleBody,
  selectedCategory,
  setSelectedCategory,
  statusAsPublished,
  setStatusAsPublished,
  setArticleTitle,
  setArticleBody,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-7/12">
        <div className="flex justify-between">
          <Input
            label="Article title"
            size="large"
            className="mr-3"
            value={articleTitle}
            onChange={e => setArticleTitle(e.target.value)}
          />
          <Select
            label="Category"
            options={categoriesOptions}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e)}
          />
        </div>
        <Textarea
          label="Article Body"
          rows={10}
          className="my-5"
          value={articleBody}
          onChange={e => setArticleBody(e.target.value)}
        />
        <div className="flex">
          <Button
            label={statusAsPublished ? "Save Published" : "Save Draft"}
            size="large"
            className="bg-bb-purple rounded-l-md"
            onClick={handleSubmit}
          />
          <div className="border-l border-white">
            <Dropdown
              buttonProps={{
                size: "large",
                className: "bg-bb-purple rounded-r-md",
              }}
            >
              <li onClick={() => setStatusAsPublished(false)}>Save Draft</li>
              <li onClick={() => setStatusAsPublished(true)}>Save Published</li>
            </Dropdown>
          </div>
          <Button
            label="Cancel"
            style="text"
            size="large"
            className="ml-2"
            onClick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
