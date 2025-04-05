import PDF_document from "pdfkit";

export function create_workout_pdf(routine, res) {
  const document = new PDF_document();

  document.pipe(res);

  document.fontSize(28).text("Workout Routine", {
    align: "center",
    stroke: true,
    fill: true,
  });
  document.moveDown();

  routine.forEach((day) => {
    document.fontSize(15).text(`${day.day} : ${day.exercises.muscle}`, {
      stroke: true,
      fill: true,
    });
    document.moveDown();

    document.fontSize(12).list(day.exercises.exercises);
    document.moveDown();
  });

  document.end();
}
