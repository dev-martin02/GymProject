import { useParams } from "react-router";
import { useStore } from "../store";
import GymExerciseDisplay from "../components/GymExerciseDisplay";

export function Workout() {
  const { routine_arr } = useStore();

  const { workout } = useParams();

  const selected_workout = routine_arr.find((data) => {
    return data.exercises.muscle.toLowerCase() === workout;
  });

  return (
    <>
      <GymExerciseDisplay routineData={selected_workout} />
    </>
  );
}
