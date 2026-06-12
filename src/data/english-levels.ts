import type { EnglishLevel, EnglishLevelStudent } from "@/types/academic";

export const englishLevels: EnglishLevel[] = [
  {
    id: "english_level_a",
    name: "Nivel A de Ingles",
    level: "secundaria",
    cycleId: "cycle_2025_2026",
    isActive: true,
  },
  {
    id: "english_level_b",
    name: "Nivel B de Ingles",
    level: "secundaria",
    cycleId: "cycle_2025_2026",
    isActive: true,
  },
];

export const englishLevelStudents: EnglishLevelStudent[] = [
  { id: "els_001", englishLevelId: "english_level_a", studentId: "student_001", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_002", englishLevelId: "english_level_a", studentId: "student_002", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_003", englishLevelId: "english_level_a", studentId: "student_003", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_004", englishLevelId: "english_level_a", studentId: "student_004", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_005", englishLevelId: "english_level_a", studentId: "student_005", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_006", englishLevelId: "english_level_a", studentId: "student_006", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_007", englishLevelId: "english_level_a", studentId: "student_007", cycleId: "cycle_2025_2026", isActive: true },

  { id: "els_008", englishLevelId: "english_level_b", studentId: "student_008", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_009", englishLevelId: "english_level_b", studentId: "student_009", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_010", englishLevelId: "english_level_b", studentId: "student_010", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_011", englishLevelId: "english_level_b", studentId: "student_011", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_012", englishLevelId: "english_level_b", studentId: "student_012", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_013", englishLevelId: "english_level_b", studentId: "student_013", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_014", englishLevelId: "english_level_b", studentId: "student_014", cycleId: "cycle_2025_2026", isActive: true },
  { id: "els_015", englishLevelId: "english_level_b", studentId: "student_015", cycleId: "cycle_2025_2026", isActive: true },
];
