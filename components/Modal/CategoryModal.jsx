import HttpKit from "@/common/helpers/HttpKit";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CategoryModal = ({ closeModal, setRefreshCategory }) => {
  const [categoryName, setCategoryName] = useState({ name: "" }); 
  let loadingToaster;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    console.log(categoryName);
    try {
      loadingToaster = toast.loading("Adding new category...");
      const res = await HttpKit.addNewCategory(categoryName); 
      console.log(res);
      
      if (res?.success === true) {
        toast.dismiss(loadingToaster);
        toast.success(`${categoryName.name} added successfully!`); 
        closeModal();
        setRefreshCategory(true)
      } else {
        toast.dismiss(loadingToaster);
        toast.error(`Failed to add category. Already exists`);
      }
    } catch (error) {
      toast.dismiss(loadingToaster);
      toast.error(`Error: ${error?.message || "Please try again"}`);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Add Category</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-semibold text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              className="w-full p-2 border rounded-lg border-gray-300 mt-1"
              value={categoryName.name} // Access the `name` property
              onChange={(e) =>
                setCategoryName({ name: e.target.value }) // Update `name` property
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Close
            </button>
            <button
              onClick={handleAddCategory}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
