import type { Teacher } from "@/types/academic";

export const teachers: Teacher[] = [
  {
    id: "teacher_a",
    fullName: "Maestro A",
    subjectIds: ["subject_math_sec", "subject_math_prep"],
    officialGroupIds: [
      "group_1a_sec",
      "group_2a_sec",
      "group_3a_sec",
      "group_1a_prep",
      "group_2a_prep",
      "group_3a_prep",
    ],
    englishLevelIds: [],
    isActive: true,
  },
  {
    id: "teacher_b",
    fullName: "Maestra B",
    subjectIds: [
      "subject_history_sec",
      "subject_spanish_sec",
      "subject_history_prep",
      "subject_spanish_prep",
    ],
    officialGroupIds: [
      "group_1a_sec",
      "group_2a_sec",
      "group_3a_sec",
      "group_1a_prep",
      "group_2a_prep",
      "group_3a_prep",
    ],
    englishLevelIds: [],
    isActive: true,
  },
  {
    id: "teacher_c",
    fullName: "Maestro C",
    subjectIds: ["subject_english_sec", "subject_english_prep"],
    officialGroupIds: [],
    englishLevelIds: ["english_level_a", "english_level_b"],
    isActive: true,
  },
];
