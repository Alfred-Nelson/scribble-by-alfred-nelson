import React, { useEffect, useState } from "react";

import { Check, Plus, Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

import { CategoriesApi } from "apis/categories";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [showCategoryEdit, setShowCategoryEdit] = useState(null);
  const [categoryEditInput, setCategoryEditInput] = useState("");

  const fetchCategoryDetails = async () => {
    const response = await CategoriesApi.list();
    setCategories(response.data.categories);
  };

  const handleCreateCategory = async () => {
    setShowCreateInput(prev => !prev);
    if (categoryInput !== "") {
      const response = await CategoriesApi.create({
        category: { value: categoryInput },
      });
      const newCategories = categories.concat({
        value: categoryInput,
        id: response.data.id,
        position: response.data.position,
      });
      setCategories(newCategories);
    }
    setCategoryInput("");
  };

  const handleDelete = async (id, value, index) => {
    const result = confirm(`Are you sure to delete the category ${value}`);
    if (result) {
      await CategoriesApi.destroy(id);
      setCategories(prev => {
        prev.splice(index, 1);
        return [...prev];
      });
    }
  };

  const handleEdit = (id, value) => {
    const result =
      showCategoryEdit === null || showCategoryEdit !== id ? id : null;
    setShowCategoryEdit(result);
    setCategoryEditInput(value);
  };

  const handleEditSubmit = async (id, index) => {
    if (categories[index].value !== categoryEditInput) {
      const payload = { category: { value: categoryEditInput } };
      await CategoriesApi.update(id, payload);
      categories[index].value = categoryEditInput;
      setCategories([...categories]);
    }
    setShowCategoryEdit(null);
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="flex">
        <div className="w-400 mr-20">
          <Typography style="h2"> Manage Categories </Typography>
          <Typography style="body2" className="text-gray-600">
            Create and configure categories inside your scribble
          </Typography>
          <div className={`${showCreateInput ? "mt-4" : "mt-6"} mb-3`}>
            {!showCreateInput ? (
              <Typography
                className="flex text-sm text-indigo-600 cursor-pointer"
                onClick={() => setShowCreateInput(prev => !prev)}
              >
                <Plus color="#5a67d8" size={20} /> Add New Category
              </Typography>
            ) : (
              <div>
                <Input
                  className="w-7/12"
                  placeholder="New Category"
                  value={categoryInput}
                  onChange={e => setCategoryInput(e.target.value)}
                  suffix={
                    <Check
                      size={20}
                      className="cursor-pointer"
                      onClick={handleCreateCategory}
                    />
                  }
                />
              </div>
            )}
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex justify-between w-full border-t border-gray-200 py-3"
            >
              <div className="w-full flex items-center">
                <div className="flex items-center">
                  <i className="ri-drag-move-2-line mr-2"></i>
                </div>
                <div className="w-full">
                  {showCategoryEdit !== index ? (
                    <>{category.value}</>
                  ) : (
                    <Input
                      className="w-9/12"
                      value={categoryEditInput}
                      onChange={e => setCategoryEditInput(e.target.value)}
                      suffix={
                        <Check
                          onClick={() => {
                            handleEditSubmit(category.id, index);
                          }}
                        />
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Delete
                  className="hover:text-red-400 mr-4 "
                  onClick={() =>
                    handleDelete(category.id, category.value, index)
                  }
                  size={16}
                />
                <Edit
                  className="hover:text-indigo-600"
                  size={19}
                  onClick={() => handleEdit(index, category.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
