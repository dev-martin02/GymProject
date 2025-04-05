import { create } from "zustand";

export const useStore = create((set) => ({
  routine_arr: [],
  update_routine: (routine) => set(() => ({ routine_arr: routine })),

  pdf_link: "",
  update_pdf_link: (link) => set(() => ({ pdf_link: link })),

  user_availability: "",
  update_availability: (days) => set(() => ({ user_availability: days })),

  place: true,
  update_place: (p) => set(() => ({ place: p })),
}));
