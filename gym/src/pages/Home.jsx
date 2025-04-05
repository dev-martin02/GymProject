import { Link } from "react-router";
import gymImage from "../img/gym.jpg";

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center p-5 bg-black text-white shadow-md">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className=" underline underline-offset-4  decoration-2 decoration-red-700">
            GetReadyNow{" "}
          </span>{" "}
          🏋🏽
        </h2>
      </header>
      <div className="h-screen">
        <main className="flex flex-col lg:flex-row h-full md:h-9/12">
          {/* Left Section */}
          <section className="flex flex-col bg-black justify-center items-center xl:items-start text-center xl:text-left w-full xl:w-1/2 p-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-red-600">Stop Wishing.</span> Start Doing.
            </h1>
            <h2 className="text-2xl lg:text-4xl font-semibold mt-6">
              Your <span className="text-red-600">Next Level</span> Of{" "}
              <span className="text-red-600">Fitness</span> Awaits.
            </h2>
            <Link
              to="schedule"
              // className="mt-10 py-3 px-8 bg-red-600 hover:bg-red-700 rounded-md font-bold transition-colors"
              className=" mt-10 btn btn-outline text-red-700 border-red-700  btn-error hover:bg-red-700 hover:text-white"
            >
              Sign Up Today
            </Link>
          </section>

          {/* Right Section - Image */}
          <section className="w-full xl:w-1/2 h-96 xl:h-full flex justify-center items-center">
            <img
              src={gymImage}
              className="h-full w-full object-cover rounded-lg shadow-lg"
              alt="Fitness training"
            />
          </section>
        </main>
      </div>
    </>
  );
}
