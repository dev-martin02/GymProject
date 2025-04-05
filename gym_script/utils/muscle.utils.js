// .filter(boolean) will remove the undefined values from the arr
function findMuscle(musclesNames, workoutArr) {
  if (!workoutArr) return [];

  return musclesNames
    .map((muscle) =>
      workoutArr.find(({ muscle: m }) => m.toLowerCase() === muscle)
    )
    .filter(Boolean);
}
function generateMixedExercises(muscleGroup1, muscleGroup2) {
  const mixedExercises = [];
  const exercisesPerMuscle = 3; // We'll get 3 exercises from each muscle group

  for (let i = 0; i < exercisesPerMuscle; i++) {
    // Get random exercise from first muscle group
    const randomIndex1 = Math.floor(
      Math.random() * muscleGroup1.exercises.length
    );
    mixedExercises.push(muscleGroup1.exercises[randomIndex1]);

    // Get random exercise from second muscle group
    const randomIndex2 = Math.floor(
      Math.random() * muscleGroup2.exercises.length
    );
    mixedExercises.push(muscleGroup2.exercises[randomIndex2]);
  }

  return mixedExercises;
}

export function combineMuscles(arr, currentWorkoutRoutine) {
  const muscleArr = findMuscle(arr, currentWorkoutRoutine);
  if (muscleArr.length < 2) return []; // ✅ Return an empty array instead of null or an object

  return [
    {
      muscle: `${muscleArr[0].muscle} + ${muscleArr[1].muscle}`,
      exercises: generateMixedExercises(muscleArr[0], muscleArr[1]),
    },
  ];
}
