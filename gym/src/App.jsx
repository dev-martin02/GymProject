import { Route, Routes } from "react-router";
import Schedule from "./pages/Schedule";
import { Routine } from "./pages/Routine";
import { Workout } from "./pages/Workout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/routine/:workout" element={<Workout />} />
    </Routes>
  );
}

export default App;
