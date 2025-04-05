export const getWorkout = async (days, userInfo, id) => {
  console.log("getWorkout called with:", { days, userInfo, id });

  const response = await fetch("http://localhost:8080", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      days,
      userInfo: userInfo,
      requestId: id,
    }),
  });

  const data = await response.json();
  return data;
};
