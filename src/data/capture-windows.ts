import type { AcademicLevel } from "@/types/academic";

type CaptureWindowStatus = "Activo" | "Bloqueado";

export type CaptureWindow = {
  id: string;
  level: AcademicLevel;
  termId: string;
  status: CaptureWindowStatus;
};

export const captureWindows: CaptureWindow[] = [
  {
    id: "window_sec_term_2",
    level: "secundaria",
    termId: "term_2",
    status: "Bloqueado",
  },
  {
    id: "window_prep_term_2",
    level: "preparatoria",
    termId: "term_2",
    status: "Activo",
  },
];
