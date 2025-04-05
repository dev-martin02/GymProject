import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

// Import all images dynamically from src/assets
const images = import.meta.glob("/src/assets/*.jpg");

export default function RoutineCard({ day, workout }) {
  const [workout_obj, set_workout_obj] = useState({});

  async function loadImage(imageName) {
    const imagePath = `/src/assets/${imageName}.jpg`;
    const chest_combination = imageName.includes("chest");

    if (chest_combination) {
      const img_path = await images["/src/assets/chest.jpg"]();
      return img_path.default;
    }

    if (images[imagePath]) {
      const img_path = await images[imagePath]();
      return img_path.default;
    }
  }
  useEffect(() => {
    async function fetchData() {
      const img_path = await loadImage(workout.toLowerCase());
      set_workout_obj({ workout, img_path: img_path });
    }
    fetchData();
  }, [workout_obj]);

  return (
    <Link
      to={`${workout.toLowerCase()}`}
      className="card w-full bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >
      <figure className="relative h-64 w-full">
        <img
          alt={`${workout} workout`}
          src={workout_obj.img_path}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
        <h2 className="absolute top-3 left-3 bg-gradient-to-r from-black/70 to-transparent text-white px-4 py-2 rounded-lg text-xl font-bold tracking-wide shadow-md">
          {`${day}: ${workout}`}
        </h2>
      </figure>
    </Link>
  );
}
