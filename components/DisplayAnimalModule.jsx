import Image from "next/image";
import React from "react";

const DisplayAnimalModule = ({ allAnimals }) => {
  return (
    <div className="p-6 bg-black shadow-md rounded-md max-w-screen-lg mx-auto min-h-[400px] flex flex-col justify-center">
      {allAnimals?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allAnimals?.map((animal) => (
            <div
              key={animal.id}
              className="bg-black rounded-lg overflow-hidden text-center"
            >
              <Image
                width={100}
                height={100} 
                src={animal.imageUrl}
                alt={animal.name}
                className="w-full h-40 object-cover"
              />
              <span className="text-center text-white  text-md">{animal.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No animals available. Select a category to view animals.
        </div>
      )}
    </div>
  );
};

export default DisplayAnimalModule;
