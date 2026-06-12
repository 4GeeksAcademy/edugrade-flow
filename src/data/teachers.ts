import type { Teacher } from "@/types/academic";

export const teachers: Teacher[] = [
  {
    id: "teacher_a",
    fullName: "Maestro A",
    subjectIds: ["subject_math"],
    officialGroupIds: ["group_1a_sec", "group_2a_sec", "group_3a_sec"],
    englishLevelIds: [],
    isActive: true,
  },
  {
    id: "teacher_b",
    fullName: "Maestra B",
    subjectIds: ["subject_history", "subject_spanish"],
    officialGroupIds: ["group_1a_sec", "group_2a_sec", "group_3a_sec"],
    englishLevelIds: [],
    isActive: true,
  },
  {
    id: "teacher_c",
    fullName: "Maestro C",
    subjectIds: ["subject_english"],
    officialGroupIds: [],
    englishLevelIds: ["english_level_a", "english_level_b"],
    isActive: true,
  },
];
