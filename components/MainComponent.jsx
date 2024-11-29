"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DisplayAnimalModule from "./DisplayAnimalModule";
import ControllerComponent from "./ControllerComponent";
import toast from "react-hot-toast";

const MainComponent = () => {
  const [allCategory, setCategory] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [originalAnimals, setOriginalAnimals] = useState([]); // Keep the original list of animals
  const [refreshCategory, setRefreshCategory] = useState(false);
  const [refreshItem, setRefreshItem] = useState(false);

  let loadinToaste;
  const fetchAllCategory = async () => {
    try {
      const res = await HttpKit.getAllCategory();
      setCategory(res.allCategory);
      setRefreshCategory(false)
    } catch (error) {
      toast.error("Error fetching ctegory:", error);
    }
  };
  const fetchData = async () => {
    loadinToaste = toast.loading("Loading..., please wait a bit 💤");
    try {
      const res = await HttpKit.fetchAllAnimal();
      setAllAnimals(res?.data);
      setOriginalAnimals(res?.data); // Store the original list
      toast.dismiss(loadinToaste);
    } catch (error) {
      toast.error("Error fetching data:", error);
      toast.dismiss(loadinToaste);
    }
  };
  useEffect(() => {
    fetchAllCategory();
    toast.dismiss(loadinToaste);
  }, [refreshCategory]); // Trigger useEffect whenever `data` changes
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="flex items-center justify-between space-x-16">
        <div className="text-blue-700 text-center">
          {allCategory?.map((category) => (
            <button
              onClick={() => handleFilter(category._id)}
              key={category._id}
              className="bg-transparent text-blue-500 py-1 px-2 m-2 rounded border border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {category.name}
            </button>
          ))}
          <button
            onClick={() => handleFilter(null)}
            className="bg-gray-500 text-white py-1 px-3 m-2 rounded hover:bg-gray-600 transition"
          >
            Show All
          </button>
        </div>
        <div>
          <ControllerComponent
            allCategory={allCategory}
            setRefreshCategory={setRefreshCategory}
            setRefreshItem={setRefreshItem}
          />
        </div>
      </div>
      <DisplayAnimalModule allAnimals={allAnimals} />
    </div>
  );
};

export default MainComponent;
