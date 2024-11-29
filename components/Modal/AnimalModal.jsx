"use client";
import HttpKit from "@/common/helpers/HttpKit";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AnimalModal = ({ closeModal, allCategory, setRefreshItem }) => {
  const [image, setImageBase64] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    img: "",
    categoryId: "",
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Set the base64 image
        setNewAnimal({ ...newAnimal, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setNewAnimal({ ...newAnimal, categoryId: event.target.value });
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setNewAnimal({ ...newAnimal, name: value });
  };
  let loadingToaster;
  const handleAddNewAnimal = async () => {
    loadingToaster = toast.loading("Adding new animal..");
    try {
      const res = await HttpKit.addNewAnimal(newAnimal);
      if (res?.success === true) {
        toast.dismiss(loadingToaster)
        toast.success(`${newAnimal.name} added successfully!`);
        setRefreshItem(true)
        closeModal(); 
      } else {
        toast.dismiss(loadingToaster)
        toast.error("Failed to add the animal. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToaster)
      toast.error(`Error: ${error?.message || "Please try again"}`);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Add Animal</h2>
        <form>
          {/* Animal Name Input */}
          <div className="mb-4">
            <label
              htmlFor="animalName"
              className="block text-sm font-semibold text-gray-700"
            >
              Animal Name
            </label>
            <input
              type="text"
              id="animalName"
              placeholder="Enter animal name"
              className="w-full p-2 border rounded-lg border-gray-300 mt-1"
              value={newAnimal.name} // Bind the input value to state
              onChange={handleNameChange} // Update state on change
            />
          </div>

          {/* Animal Image Input */}
          <div className="mb-4">
            <label
              htmlFor="animalImage"
              className="block text-sm font-semibold text-gray-700"
            >
              Animal Image
            </label>
            <input
              type="file"
              id="animalImage"
              onChange={handleFileChange} // Handle file change to store base64 image
              accept="image/*"
              className="w-full p-2 border rounded-lg border-gray-300 mt-1"
            />
          </div>

          {/* Animal Category Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="animalCategory"
              className="block text-sm font-semibold text-gray-700"
            >
              Animal Category
            </label>
            <select
              id="animalCategory"
              className="w-full p-2 border rounded-lg border-gray-300 mt-1"
              value={newAnimal.categoryId} // Bind the select value to state
              onChange={handleCategoryChange} // Update category state on change
            >
              <option value="">Select a category</option>
              {allCategory?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for Close and Submit */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleAddNewAnimal}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalModal;
