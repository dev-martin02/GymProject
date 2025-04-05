// Project summary -> Script which is going to generated a workout routine for 5 days a weeks + 2 meals easy meals that you can make

// - The workout routine should be a PDF and it will be e-mailing to you
// - The PDF should have hyperlinks where each workout will have a link to a youtube video
// - Automatically will send you a PDF which is going to change the routine each week ( to avoid endurance in your body, it stop growing)
// - It will use AI to recommend your meals of the week

// Server -----------
import express from "express";
import cors from "cors";
import { create_workout_pdf } from "./util.js";
import { create_routine } from "./controllers/workouts.js";

const app = express();

app.use(express.json());
app.use(cors());

//! There is a bug were if the user goes more 7 days the backend will crash
app.post("/", async (req, res) => {
  const { days, userInfo } = req.body;

  const routine = create_routine(days, userInfo);
  res.status(200).json(routine);
});
app.post("/pdf", async (req, res) => {
  const { routine } = req.body;
  await create_workout_pdf(routine, res);
});

app.listen("8080", () => {
  console.log("PORT is running on 8080");
});
