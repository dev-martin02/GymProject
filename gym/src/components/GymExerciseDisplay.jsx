import React from "react";

const GymExerciseDisplay = ({ routineData }) => {
  // Extract data
  const { day, exercises } = routineData;
  const { muscle, exercises: exerciseList } = exercises;

  return (
    <div className=" rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Workout header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex gap-4">
            <h2 className="text-2xl font-bold text-white capitalize">{day}</h2>
            <p className="px-3 h-8 leading-8 bg-gray-600 text-white rounded-md text-md font-medium text-center">
              {muscle}
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium">
              {exerciseList.length} exercises
            </span>
          </div>
        </div>

        {/* Exercise list */}
        <div className="grid gap-3">
          {exerciseList.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full font-bold">
                {index + 1}
              </div>
              <span className="font-medium text-gray-200">{exercise}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymExerciseDisplay;
