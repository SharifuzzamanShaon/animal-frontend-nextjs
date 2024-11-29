import React, { useState } from 'react';
import CategoryModal from './Modal/CategoryModal';
import AnimalModal from './Modal/AnimalModal';

const ControllerComponent = ({allCategory, setRefreshCategory, setRefreshItem}) => {
  const [openAnimalModal, setOpenAnimalModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  // Function to close modals
  const closeModal = () => {
    setOpenAnimalModal(false);
    setOpenCategoryModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setOpenAnimalModal(true)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Add Animal
        </button>
        <button
          onClick={() => setOpenCategoryModal(true)}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
        >
          Add Category
        </button>
      </div>

      {/* Animal Modal */}
      {openAnimalModal && (
       <AnimalModal closeModal={closeModal} allCategory={allCategory} setRefreshItem={setRefreshItem}/>
      )}

      {/* Category Modal */}
      {openCategoryModal && (
       <CategoryModal closeModal={closeModal} setRefreshCategory={setRefreshCategory}/>
      )}
    </div>
  );
};

export default ControllerComponent;
