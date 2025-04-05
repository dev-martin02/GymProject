/*
    Services
      Contains business logic
      Orchestrates data flow between controllers and repositories
      Handles complex operations and transformations
      Independent of HTTP layer
*/

import { combineMuscles } from "../utils/muscle.utils.js";
import { generateRandomExercises } from "../utils/generate.utils.js";

function createDailyRoutine(day, workoutList, existingRoutine) {
  const randomIndex = Math.floor(Math.random() * workoutList.length);

  // Check if muscle group already exists in routine
  const routineExists = existingRoutine.some(
    ({ exercises }) => exercises.muscle === workoutList[randomIndex].muscle
  );

  if (routineExists) return null;
  return {
    day,
    exercises: workoutList[randomIndex],
  };
}

export const createWorkoutRoutine = (
  userDays,
  userInfo = { equipment: true }
) => {
  const userExercises = generateRandomExercises(userDays, userInfo);

  const chestCombination = ["chest", "triceps"];
  const weekdays = userDays || [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return generateWorkouts(weekdays, userExercises, chestCombination);
};

function generateWorkouts(weekdays, exercises, combinations) {
  const userRoutine = [];
  const filteredWorkoutList = removeCombinationsExercise(
    combinations,
    exercises
  );
  const getMuscleCombination = combineMuscles(combinations, exercises);

  const newWorkoutList = [...filteredWorkoutList, ...getMuscleCombination];

  for (let i = 0; weekdays.length - 1 >= i; i++) {
    const routine = createDailyRoutine(
      weekdays[i],
      newWorkoutList,
      userRoutine
    );
    if (routine) {
      userRoutine.push(routine);
    } else {
      i--;
    }
  }

  return userRoutine;
}

function removeCombinationsExercise(combinations, exercises) {
  if (!Array.isArray(combinations)) {
    console.error("Error: combination is not an array");
    return []; // Return empty array instead of a string
  }
  if (combinations.length <= 1) {
    console.error("Error: we need 2 or more muscles to combine");
    return [];
  }
  if (!Array.isArray(exercises) || exercises.length === 0) {
    console.error("Error: Exercise list is empty or invalid");
    return [];
  }

  try {
    return exercises.filter(
      ({ muscle }) => !combinations.includes(muscle.toLowerCase())
    );
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
