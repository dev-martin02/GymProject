import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { getWorkout } from "../api/Api";
import { useStore } from "../store";

export default function Schedule() {
  const { update_availability, update_place, place, update_routine } =
    useStore();
  const [userDays, setUserDays] = useState([]);

  const handleSelectedPlace = (event) => {
    if (event.target.value !== "gym") {
      update_place(false);
    } else {
      update_place(true);
    }
  };
  const navigate = useNavigate();

  function weekdays() {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const weekdays_arr = [];
    days.forEach((day) => {
      weekdays_arr.push({
        initial_letter: day[0].toLocaleUpperCase(),
        day: day,
      });
    });
    return weekdays_arr;
  }

  function addDay(event) {
    if (event.target.checked) {
      setUserDays((days) => [...days, event.target.name]);
    } else {
      const newDays = userDays.filter((days) => days !== event.target.name);
      setUserDays(newDays);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await getWorkout(userDays, place);
      console.log("Form submission successful:", response);
      update_routine(response);
      update_availability(userDays);
      navigate("/routine");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <header className="flex justify-between items-center px-6 py-4 bg-black ">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className=" underline underline-offset-4  decoration-2 decoration-red-700">
            {" "}
            GetReadyNow{" "}
          </span>{" "}
          🏋🏽
        </h2>
      </header>

      <main className="container mx-auto px-4 py-8 ">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-red-600">Workout</span> Routine Generator
        </h1>

        <section className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Image container */}
          <div className="w-full lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
            <img
              className="w-full h-auto object-cover"
              alt="Workout animation"
              src="https://media.giphy.com/media/KDQ25pahVfwGRvvT9X/giphy.gif?cid=790b7611pffeubdvmqav0m811dybm8gaud3ra2m41hbdcwju&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            />
          </div>

          {/* Form container */}
          <div className="w-full lg:w-1/2 bg-black p-8 rounded-lg shadow-lg border border-gray-800">
            <p className="text-2xl font-bold mb-8 text-center">
              Tell us your <span className="text-red-600">availability</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center gap-4 flex-wrap">
                {weekdays().map(({ initial_letter, day }) => (
                  <label key={day} className="flex flex-col items-center gap-2">
                    <span className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors">
                      {initial_letter}
                    </span>
                    <input
                      type="checkbox"
                      name={day}
                      onChange={addDay}
                      className="w-5 h-5 accent-red-600"
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-center gap-4 items-end">
                <button
                  type="submit"
                  className="py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md font-bold transition-colors text-lg"
                >
                  Create Your Routine
                </button>
                <div className="flex flex-col">
                  <label className="text-center text-lg font-bold mb-1">
                    Where are you going to exercise?
                  </label>
                  <select
                    name="exercise_location"
                    defaultValue="gym"
                    onChange={handleSelectedPlace}
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-md font-bold transition-colors text-lg"
                  >
                    <option value="gym">Gym</option>
                    <option value="home">Outdoor/Home</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
