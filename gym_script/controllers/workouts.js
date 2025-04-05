/*
Controllers
  Handle HTTP requests and responses
  Input validation and sanitization
  No business logic
  Delegate work to services
  Return appropriate HTTP status codes and responses
*/

import { createWorkoutRoutine } from "../services/workout.services.js";

export const create_routine = (userDays, userInfo) => {
  try {
    return createWorkoutRoutine(userDays, userInfo);
  } catch (error) {
    console.log(error.message);
    console.log(error);
    throw new Error("Failed to create workout routine");
  }
};
