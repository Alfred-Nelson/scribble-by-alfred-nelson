import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { DragDropContext } from "react-beautiful-dnd";

import { CategoriesApi } from "apis/categories";

import Create from "./Create";
import DragAndDrop from "./DragAndDrop";

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
    setShowCategoryEdit(null);
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

  const updateByDrag = async (id, payload) =>
    await CategoriesApi.update(id, payload);

  const handleDrag = dragProp => {
    const source = dragProp.source.index;
    const destination = dragProp.destination.index;
    if (source !== destination) {
      const id = categories[source].id;
      const payload = { category: { position: destination + 1 } };
      categories.splice(destination, 0, categories.splice(source, 1)[0]);
      setCategories([...categories]);
      updateByDrag(id, payload);
    }
  };

  // const handleDrop = async () => {
  //   await new Promise((resolve) => {
  //     setTimeout(() => resolve(), 5000);
  //   });
  // }

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="w-full flex justify-center">
        <div className="flex">
          <div className="w-400 mr-20">
            <Typography style="h2"> Manage Categories </Typography>
            <Typography style="body2" className="text-gray-600">
              Create and configure categories inside your scribble
            </Typography>
            <Create
              showCreateInput={showCreateInput}
              categoryInput={categoryInput}
              setShowCreateInput={setShowCreateInput}
              setCategoryInput={setCategoryInput}
              handleCreateCategory={handleCreateCategory}
            />
            <DragAndDrop
              categories={categories}
              showCategoryEdit={showCategoryEdit}
              categoryEditInput={categoryEditInput}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleEditSubmit={handleEditSubmit}
              setCategoryEditInput={setCategoryEditInput}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ManageCategories;
