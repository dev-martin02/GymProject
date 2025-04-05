/*
   Utils
    Reusable helper functions
    Pure functions (same input = same output)
    No business logic or state
    Can be used across different parts of the application
*/

import workoutData from "../workouts.json" assert { type: "json" };

export function generateRandomExercises(userDays, userInfo) {
  return workoutData.muscleGroups.map(({ muscle, exercises }) => ({
    muscle,
    exercises: generateExerciseList(exercises, userInfo, 5),
  }));
}

function isValidExercise(exercise, existingExercises, userInfo) {
  // Check if exercise is already in the list
  if (existingExercises.includes(exercise.name)) {
    return false;
  }

  // Check if the exercise requires equipment and the user doesn't have access
  if (exercise.equipment.length > 0 && !userInfo) {
    return false;
  }

  return true;
}

function generateExerciseList(exercises, userInfo, count) {
  const result = [];
  const totalExercises = exercises.length;
  let attempts = 0;
  const maxAttempts = 100;

  while (result.length < count && attempts < maxAttempts) {
    attempts++;
    const exercise = exercises[Math.floor(Math.random() * totalExercises)];

    if (!isValidExercise(exercise, result, userInfo)) continue;

    result.push(exercise.name);
  }

  return result;
}
