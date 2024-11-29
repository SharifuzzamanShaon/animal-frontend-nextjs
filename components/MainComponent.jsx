"use client";
import HttpKit from "@/common/helpers/HttpKit";
import React, { useEffect, useState } from "react";
import DisplayAnimalModule from "./DisplayAnimalModule";
import ControllerComponent from "./ControllerComponent";
import toast from "react-hot-toast";

const MainComponent = () => {
  const [allCategory, setCategory] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [originalAnimals, setOriginalAnimals] = useState([]);
  const [refreshCategory, setRefreshCategory] = useState(false); // refresh after adding new category
  const [refreshItem, setRefreshItem] = useState(false); // refresh itmes after adding new item

  let loadinToaste; // Track the current loading toast

  const fetchAllCategory = async () => {
    try {
      const res = await HttpKit.getAllCategory();
      setCategory(res.allCategory);
      setRefreshCategory(false);
    } catch (error) {
      toast.error("Error fetching category");
    }
  };

  const fetchData = async () => {
    try {
      // Check if a toast is already active
      if (!loadinToaste) {
        loadinToaste = toast.loading("Loading..., please wait a bit 💤");
      }

      const res = await HttpKit.fetchAllAnimal();
      setAllAnimals(res?.data);
      setOriginalAnimals(res?.data);

      // Dismiss the loading toast and reset
      toast.dismiss(loadinToaste);
      loadinToaste = null;
    } catch (error) {
      toast.error("Error fetching data");

      // Dismiss the loading toast even in case of an error
      if (loadinToaste) {
        toast.dismiss(loadinToaste);
        loadinToaste = null;
      }
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, [refreshCategory]);

  useEffect(() => {
    fetchData();
  }, [refreshItem]);
  const handleFilter = (categoryId) => {
    if (!categoryId) {
      setAllAnimals(originalAnimals);
    } else {
      const filteredItems = originalAnimals.filter(
        (item) => item.categoryId === categoryId
      );
      setAllAnimals(filteredItems);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="flex flex-wrap items-center justify-between w-full space-y-4 sm:space-y-0 sm:space-x-8">
        {/* Category Buttons Section */}
        <div className="text-blue-700 text-center w-full sm:w-auto flex flex-wrap justify-center gap-2">
          {allCategory?.map((category) => (
            <button
              onClick={() => handleFilter(category._id)}
              key={category._id}
              className="bg-transparent text-blue-500 py-1 px-2 m-1 rounded border border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {category.name}
            </button>
          ))}
          <button
            onClick={() => handleFilter(null)}
            className="bg-gray-500 text-white py-1 px-3 m-1 rounded hover:bg-gray-600 transition"
          >
            Show All
          </button>
        </div>
        <div className="w-full sm:w-auto flex justify-center">
          <ControllerComponent
            allCategory={allCategory}
            setRefreshCategory={setRefreshCategory}
            setRefreshItem={setRefreshItem}
          />
        </div>
      </div>
      {/* Display Animal Module */}
      <div className="w-full max-w-5xl mt-8">
        <DisplayAnimalModule allAnimals={allAnimals} />
      </div>
    </div>
  );
};

export default MainComponent;
