import { useEffect, useState } from "react";
import { getWorkout } from "../api/Api";
import Routine_card from "../components/RoutineCard";
import { useStore } from "../store";

export function Routine() {
  const {
    update_routine,
    update_pdf_link,
    user_availability,
    routine_arr,
    place,
  } = useStore();
  const [pdfUrl, setPdfUrl] = useState("");

  const fetchPDF = async (routine) => {
    try {
      const response = await fetch("http://localhost:8080/pdf", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ routine }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const createRoutine = async () => {
    try {
      const response = await getWorkout(user_availability, place);
      update_routine(response);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  console.log(user_availability);
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center px-6 py-4 bg-black ">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className=" underline underline-offset-4  decoration-2 decoration-red-700">
            {" "}
            GetReadyNow{" "}
          </span>{" "}
          🏋🏽
        </h2>
      </header>

      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-red-600">Routine</span> for the Week
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-bold transition-colors"
              onClick={() => createRoutine()}
            >
              Generate Routine
            </button>
            <button
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md font-bold transition-colors"
              onClick={() => fetchPDF(routine_arr)}
            >
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <span>View PDF</span>
                </a>
              ) : (
                "Create PDF"
              )}
            </button>
            {pdfUrl && (
              <a
                className="px-6 py-3 bg-black hover:bg-gray-900 rounded-md font-bold transition-colors border border-gray-700 flex items-center gap-2"
                href={pdfUrl}
                download={"workout.pdf"}
              >
                <span className="text-lg">↓</span> Download
              </a>
            )}
          </div>
        </header>

        <div className="h-px w-full bg-gray-800 my-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routine_arr.length > 0 ? (
            routine_arr.map((randomEx, index) => (
              <Routine_card
                key={`${randomEx.day}-${index}`}
                day={randomEx.day}
                workout={randomEx.exercises.muscle}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-12 bg-black rounded-lg border border-gray-800">
              <p className="text-xl text-gray-400">No routine generated yet.</p>
              <p className="mt-4 text-red-600">
                Click "Generate Routine" to start
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
