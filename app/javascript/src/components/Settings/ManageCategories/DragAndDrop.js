import React from "react";

import { Check, Delete, Edit } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";
import { Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDrop = ({
  categories,
  showCategoryEdit,
  categoryEditInput,
  handleDelete,
  handleEdit,
  handleEditSubmit,
  setCategoryEditInput,
}) => {
  return (
    <Droppable droppableId="droppable-1">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {categories.map((category, index) => (
            <Draggable
              key={index}
              draggableId={`draggable-${index}`}
              index={index}
            >
              {provided => (
                <li
                  className="flex justify-between w-400 border-t border-gray-200 py-3"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <div className="w-full flex items-center">
                    <div
                      className="flex items-center"
                      {...provided.dragHandleProps}
                    >
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
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DragAndDrop;
