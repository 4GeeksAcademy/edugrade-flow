export type AcademicLevel = "secundaria" | "preparatoria";

export type TermStatus = "locked" | "active" | "closed";

export type GradeStatus =
  | "completo"
  | "validado"
  | "pendiente"
  | "con error"
  | "duplicado";

export type OfficialGroup = {
  id: string;
  name: string;
  level: AcademicLevel;
  cycleId: string;
  isActive: boolean;
};

export type Student = {
  id: string;
  fullName: string;
  curp: string;
  officialGroupId: string;
  cycleId: string;
  isActive: boolean;
};

export type Teacher = {
  id: string;
  fullName: string;
  subjectIds: string[];
  officialGroupIds: string[];
  englishLevelIds: string[];
  isActive: boolean;
};

export type Subject = {
  id: string;
  name: string;
  level: AcademicLevel;
  isEnglish: boolean;
  isActive: boolean;
};

export type EnglishLevel = {
  id: string;
  name: string;
  level: AcademicLevel;
  cycleId: string;
  isActive: boolean;
};

export type EnglishLevelStudent = {
  id: string;
  englishLevelId: string;
  studentId: string;
  cycleId: string;
  isActive: boolean;
};

export type Term = {
  id: string;
  cycleId: string;
  name: string;
  order: number;
  status: TermStatus;
};

export type GradeEntry = {
  id: string;
  cycleId: string;
  termId: string;
  studentId: string;
  officialGroupId: string;
  subjectId: string;
  teacherId: string;
  englishLevelId: string | null;
  absences: number | null;
  participation: number | null;
  project: number | null;
  assignments: number | null;
  exam: number | null;
  finalGrade: number | null;
  status: GradeStatus;
  capturedAt: string;
};