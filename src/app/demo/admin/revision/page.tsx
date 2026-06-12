"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { gradeEntries, officialGroups, students, subjects, teachers, terms } from "@/data";

type ReviewStatus =
  | "Pendiente"
  | "Con error"
  | "Duplicada"
  | "Completa"
  | "Validada"
  | "Revisar escala"
  | "Corrección solicitada";

type ReviewRow = {
  id: string;
  groupId: string;
  subjectId: string;
  teacherId: string;
  group: string;
  level: "Secundaria" | "Preparatoria";
  subject: string;
  teacher: string;
  status: ReviewStatus;
  observation: string;
};

type DetailStudentStatus = "Validado" | "Completo" | "Pendiente" | "Con error" | "Duplicado";

type DetailStudentRow = {
  id: string;
  studentName: string;
  finalGradeLabel: string;
  status: DetailStudentStatus;
  observation: string;
};

type ActionFeedback = {
  tone: "success" | "warning" | "error";
  message: string;
};

const statusTemplates: Array<Pick<ReviewRow, "status" | "observation">> = [
  {
    status: "Pendiente",
    observation: "Faltan campos por capturar en la materia.",
  },
  {
    status: "Con error",
    observation: "Se detectaron calificaciones fuera de validación.",
  },
  {
    status: "Duplicada",
    observation: "Existe una captura repetida para el mismo grupo y materia.",
  },
  {
    status: "Completa",
    observation: "Captura completa, lista para validación administrativa.",
  },
  {
    status: "Validada",
    observation: "Captura validada para uso en actas y boletas.",
  },
  {
    status: "Revisar escala",
    observation: "El maestro debe confirmar que la escala baja es correcta.",
  },
];

function toneByStatus(status: ReviewStatus) {
  if (status === "Validada" || status === "Completa") {
    return "green" as const;
  }

  if (status === "Con error") {
    return "red" as const;
  }

  if (status === "Duplicada" || status === "Revisar escala" || status === "Corrección solicitada") {
    return "orange" as const;
  }

  return "amber" as const;
}

function recommendationByStatus(status: ReviewStatus) {
  if (status === "Pendiente") return "Solicitar al maestro completar la captura.";
  if (status === "Con error") return "Revisar valores fuera de rango antes de validar.";
  if (status === "Duplicada") return "Conservar una captura válida y descartar la duplicada.";
  if (status === "Revisar escala") return "Confirmar que el maestro autorizó la escala antes de validar.";
  if (status === "Corrección solicitada") return "Esperar reenvío del maestro.";
  if (status === "Validada") return "Lista para actas y boletas.";
  return "Puede validarse si no hay observaciones.";
}

function toneByStudentStatus(status: DetailStudentStatus) {
  if (status === "Validado" || status === "Completo") return "green" as const;
  if (status === "Con error") return "red" as const;
  if (status === "Duplicado") return "orange" as const;
  return "amber" as const;
}

function isGradeOutOfRange(level: ReviewRow["level"], grade: number | null) {
  if (grade === null) {
    return false;
  }

  if (level === "Secundaria") {
    return grade < 1 || grade > 10;
  }

  return grade < 0 || grade > 100;
}

function outOfRangeObservationByLevel(level: ReviewRow["level"]) {
  if (level === "Secundaria") {
    return "Calificación fuera del rango permitido para secundaria: 1 a 10.";
  }

  return "Calificación fuera del rango permitido para preparatoria: 0 a 100.";
}

function demoOutOfRangeByLevel(level: ReviewRow["level"]) {
  return level === "Secundaria" ? 11.2 : 105;
}

function canValidateStatus(status: ReviewStatus) {
  return status === "Completa" || status === "Revisar escala" || status === "Validada";
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export default function DemoAdminRevisionPage() {
  const activeTerm = terms.find((term) => term.status === "active");

  const groupMap = new Map(officialGroups.map((group) => [group.id, group]));
  const subjectMap = new Map(subjects.map((subject) => [subject.id, subject]));
  const teacherMap = new Map(teachers.map((teacher) => [teacher.id, teacher]));

  const groupedKeys = Array.from(
    new Set(
      gradeEntries
        .filter((entry) => entry.termId === activeTerm?.id)
        .map((entry) => `${entry.officialGroupId}__${entry.subjectId}__${entry.teacherId}`),
    ),
  );

  const baseRows = groupedKeys
    .map((key) => {
      const [groupId, subjectId, teacherId] = key.split("__");
      const group = groupMap.get(groupId);
      const subject = subjectMap.get(subjectId);
      const teacher = teacherMap.get(teacherId);

      if (!group || !subject || !teacher) {
        return null;
      }

      return {
        id: key,
        groupId,
        subjectId,
        teacherId,
        group: group.name,
        level: group.level === "secundaria" ? "Secundaria" : "Preparatoria",
        subject: subject.name,
        teacher: teacher.fullName,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  if (baseRows.length === 0) {
    const fallbackGroup = officialGroups[0];
    const fallbackSubject = subjects[0];
    const fallbackTeacher = teachers[0];

    if (fallbackGroup && fallbackSubject && fallbackTeacher) {
      baseRows.push({
        id: `${fallbackGroup.id}__${fallbackSubject.id}__${fallbackTeacher.id}`,
        groupId: fallbackGroup.id,
        subjectId: fallbackSubject.id,
        teacherId: fallbackTeacher.id,
        group: fallbackGroup.name,
        level: fallbackGroup.level === "secundaria" ? "Secundaria" : "Preparatoria",
        subject: fallbackSubject.name,
        teacher: fallbackTeacher.fullName,
      });
    }
  }

  const initialRows: ReviewRow[] = statusTemplates.map((template, index) => {
    const base = baseRows[index % baseRows.length];

    return {
      id: `${base.id}__${index}`,
      groupId: base.groupId,
      subjectId: base.subjectId,
      teacherId: base.teacherId,
      group: base.group,
      level: base.level,
      subject: base.subject,
      teacher: base.teacher,
      status: template.status,
      observation: template.observation,
    };
  });

  const [reviewRows, setReviewRows] = useState<ReviewRow[]>(initialRows);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "Todos">("Todos");
  const [levelFilter, setLevelFilter] = useState<"Secundaria" | "Preparatoria" | "Todos">("Todos");
  const [groupFilter, setGroupFilter] = useState<string>("Todos");
  const [teacherFilter, setTeacherFilter] = useState<string>("Todos");
  const [subjectFilter, setSubjectFilter] = useState<string>("Todos");
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback | null>(null);

  const groupOptions = useMemo(
    () => Array.from(new Set(reviewRows.map((row) => row.group))).sort((a, b) => a.localeCompare(b)),
    [reviewRows],
  );
  const teacherOptions = useMemo(
    () => Array.from(new Set(reviewRows.map((row) => row.teacher))).sort((a, b) => a.localeCompare(b)),
    [reviewRows],
  );
  const subjectOptions = useMemo(
    () => Array.from(new Set(reviewRows.map((row) => row.subject))).sort((a, b) => a.localeCompare(b)),
    [reviewRows],
  );

  const filteredRows = useMemo(() => {
    const q = normalizeSearch(searchTerm);

    return reviewRows.filter((row) => {
      if (statusFilter !== "Todos" && row.status !== statusFilter) return false;
      if (levelFilter !== "Todos" && row.level !== levelFilter) return false;
      if (groupFilter !== "Todos" && row.group !== groupFilter) return false;
      if (teacherFilter !== "Todos" && row.teacher !== teacherFilter) return false;
      if (subjectFilter !== "Todos" && row.subject !== subjectFilter) return false;

      if (q.length === 0) return true;

      return (
        row.group.toLowerCase().includes(q) ||
        row.subject.toLowerCase().includes(q) ||
        row.teacher.toLowerCase().includes(q)
      );
    });
  }, [reviewRows, searchTerm, statusFilter, levelFilter, groupFilter, teacherFilter, subjectFilter]);

  const totals = {
    total: reviewRows.length,
    pendientes: reviewRows.filter((row) => row.status === "Pendiente").length,
    conError: reviewRows.filter((row) => row.status === "Con error").length,
    duplicadas: reviewRows.filter((row) => row.status === "Duplicada").length,
    revisarEscala: reviewRows.filter((row) => row.status === "Revisar escala").length,
    correccionSolicitada: reviewRows.filter((row) => row.status === "Corrección solicitada").length,
    validadas: reviewRows.filter((row) => row.status === "Validada").length,
  };

  const visibleIds = filteredRows.map((row) => row.id);
  const selectedVisibleCount = visibleIds.filter((id) => selectedIds.includes(id)).length;
  const allVisibleSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;

  const selectedDetail = selectedDetailId
    ? reviewRows.find((row) => row.id === selectedDetailId) ?? null
    : null;

  const detailStudents: DetailStudentRow[] = (() => {
    if (!selectedDetail) {
      return [];
    }

    const studentsById = new Map(students.map((student) => [student.id, student.fullName]));
    const matchedEntries = gradeEntries.filter((entry) => (
      entry.termId === activeTerm?.id
      && entry.officialGroupId === selectedDetail.groupId
      && entry.subjectId === selectedDetail.subjectId
    ));

    const buildObservation = (baseStatus: ReviewStatus, isOutOfRange: boolean, index: number) => {
      if (isOutOfRange) {
        return outOfRangeObservationByLevel(selectedDetail.level);
      }

      if (baseStatus === "Corrección solicitada") {
        return "Pendiente de corrección por el maestro.";
      }

      if (baseStatus === "Revisar escala" && index === 0) {
        return "Escala confirmada o pendiente de confirmación.";
      }

      return "Sin observación.";
    };

    const resolveStudentStatus = (
      baseStatus: ReviewStatus,
      entryStatus: string,
      isOutOfRange: boolean,
      finalGrade: number | null,
    ): DetailStudentStatus => {
      if (isOutOfRange) return "Con error";
      if (baseStatus === "Validada") return "Validado";
      if (entryStatus === "validado") return "Validado";
      if (entryStatus === "duplicado") return "Duplicado";
      if (entryStatus === "pendiente" || finalGrade === null) return "Pendiente";
      return "Completo";
    };

    if (matchedEntries.length > 0) {
      const hasOutOfRange = matchedEntries.some((entry) => isGradeOutOfRange(selectedDetail.level, entry.finalGrade));

      return matchedEntries.map((entry, index) => {
        const shouldInjectDemoOutOfRange = selectedDetail.status === "Con error" && !hasOutOfRange && index === 0;
        const effectiveFinalGrade = shouldInjectDemoOutOfRange
          ? demoOutOfRangeByLevel(selectedDetail.level)
          : entry.finalGrade;
        const isOutOfRange = isGradeOutOfRange(selectedDetail.level, effectiveFinalGrade);

        return {
          id: entry.id,
          studentName: studentsById.get(entry.studentId) ?? "Alumno no identificado",
          finalGradeLabel: effectiveFinalGrade === null ? "-" : String(effectiveFinalGrade),
          status: resolveStudentStatus(selectedDetail.status, entry.status, isOutOfRange, effectiveFinalGrade),
          observation: buildObservation(selectedDetail.status, isOutOfRange, index),
        };
      });
    }

    const fallbackStudents = students
      .filter((student) => student.officialGroupId === selectedDetail.groupId)
      .slice(0, 6);

    const sourceStudents = fallbackStudents.length > 0
      ? fallbackStudents
      : students.slice(0, 3);

    return sourceStudents.map((student, index) => {
      const demoGrade = selectedDetail.status === "Con error" && index === 0
        ? demoOutOfRangeByLevel(selectedDetail.level)
        : null;
      const isOutOfRange = isGradeOutOfRange(selectedDetail.level, demoGrade);

      return {
        id: `${selectedDetail.id}__student_${student.id}`,
        studentName: student.fullName,
        finalGradeLabel: demoGrade === null ? "-" : String(demoGrade),
        status: resolveStudentStatus(selectedDetail.status, "pendiente", isOutOfRange, demoGrade),
        observation: buildObservation(selectedDetail.status, isOutOfRange, index),
      };
    });
  })();

  const toggleSelectRow = (rowId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      }
      return [...prev, rowId];
    });
  };

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        return prev.filter((id) => !visibleIds.includes(id));
      }

      const set = new Set(prev);
      visibleIds.forEach((id) => set.add(id));
      return Array.from(set);
    });
  };

  const handleBulkValidate = () => {
    if (selectedIds.length === 0) {
      setActionFeedback({ tone: "warning", message: "Selecciona al menos una captura para validar." });
      return;
    }

    const selectedSet = new Set(selectedIds);
    let validableCount = 0;
    let blockedCount = 0;

    setReviewRows((prev) => prev.map((row) => {
      if (!selectedSet.has(row.id)) {
        return row;
      }

      if (!canValidateStatus(row.status)) {
        blockedCount += 1;
        return row;
      }

      validableCount += 1;
      return {
        ...row,
        status: "Validada",
        observation: "Captura validada por revisión administrativa masiva.",
      };
    }));

    if (validableCount > 0 && blockedCount === 0) {
      setActionFeedback({ tone: "success", message: "Capturas seleccionadas validadas correctamente." });
    } else {
      setActionFeedback({ tone: "warning", message: "Algunas capturas no se validaron porque requieren corrección o revisión previa." });
    }

    setSelectedIds([]);
  };

  const handleBulkCorrection = () => {
    if (selectedIds.length === 0) {
      setActionFeedback({ tone: "warning", message: "Selecciona al menos una captura para solicitar corrección." });
      return;
    }

    setReviewRows((prev) => prev.map((row) => (
      selectedIds.includes(row.id)
        ? {
            ...row,
            status: "Corrección solicitada",
            observation: "Corrección solicitada al maestro responsable.",
          }
        : row
    )));
    setActionFeedback({ tone: "warning", message: "Se solicitó corrección para las capturas seleccionadas." });
    setSelectedIds([]);
  };

  const handleRowValidate = (rowId: string) => {
    const targetRow = reviewRows.find((row) => row.id === rowId);
    if (!targetRow) {
      return;
    }

    if (!canValidateStatus(targetRow.status)) {
      setActionFeedback({ tone: "warning", message: "No se puede validar: la captura requiere corrección o revisión previa." });
      return;
    }

    setReviewRows((prev) => prev.map((row) => (
      row.id === rowId
        ? {
            ...row,
            status: "Validada",
            observation: "Captura validada por revisión individual.",
          }
        : row
    )));
    setActionFeedback({ tone: "success", message: "Captura validada correctamente." });
  };

  const handleRowCorrection = (rowId: string) => {
    setReviewRows((prev) => prev.map((row) => (
      row.id === rowId
        ? {
            ...row,
            status: "Corrección solicitada",
            observation: "Corrección solicitada al maestro responsable.",
          }
        : row
    )));
    setActionFeedback({ tone: "warning", message: "Se solicitó corrección para la captura seleccionada." });
  };

  const handleReviewRow = (rowId: string) => {
    setSelectedDetailId(rowId);
    setActionFeedback(null);
  };

  return (
    <AppShell
      topbarTitle="Revisión de capturas"
      topbarSubtitle={`Ciclo escolar 2025-2026 • II Trimestre (${activeTerm?.name ?? "II Trimestre"})`}
      roleLabel="Secretaría / Admin"
      activeModule="Dashboard"
    >
      <div className="space-y-6">
        <Card>
          <p className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Revisión administrativa de capturas enviadas o pendientes.
          </p>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Capturas totales</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pendientes</p>
            <p className="mt-2 text-2xl font-semibold text-amber-700">{totals.pendientes}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Con error</p>
            <p className="mt-2 text-2xl font-semibold text-red-700">{totals.conError}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Duplicados</p>
            <p className="mt-2 text-2xl font-semibold text-orange-700">{totals.duplicadas}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Revisar escala</p>
            <p className="mt-2 text-2xl font-semibold text-orange-700">{totals.revisarEscala}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Corrección solicitada</p>
            <p className="mt-2 text-2xl font-semibold text-orange-700">{totals.correccionSolicitada}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Validadas</p>
            <p className="mt-2 text-2xl font-semibold text-green-700">{totals.validadas}</p>
          </Card>
        </section>

        <Card title="Capturas por revisar" description="Bandeja masiva de revisión por grupo, materia y maestro.">
          <div className="mb-4 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 xl:grid-cols-6">
            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Estado</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as ReviewStatus | "Todos")}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Con error">Con error</option>
                <option value="Duplicada">Duplicada</option>
                <option value="Completa">Completa</option>
                <option value="Validada">Validada</option>
                <option value="Revisar escala">Revisar escala</option>
                <option value="Corrección solicitada">Corrección solicitada</option>
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Nivel educativo</span>
              <select
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value as "Secundaria" | "Preparatoria" | "Todos")}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Grupo</span>
              <select
                value={groupFilter}
                onChange={(event) => setGroupFilter(event.target.value)}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                {groupOptions.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Maestro</span>
              <select
                value={teacherFilter}
                onChange={(event) => setTeacherFilter(event.target.value)}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                {teacherOptions.map((teacher) => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Materia</span>
              <select
                value={subjectFilter}
                onChange={(event) => setSubjectFilter(event.target.value)}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Búsqueda rápida</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar grupo, materia o maestro"
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              />
            </label>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-600">
              {filteredRows.length} capturas visibles • {selectedIds.length} seleccionadas
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={handleBulkValidate}>Validar seleccionadas</Button>
              <Button variant="secondary" onClick={handleBulkCorrection}>Solicitar corrección seleccionadas</Button>
            </div>
          </div>

          {actionFeedback && (
            <p
              className={`mb-4 text-sm font-medium ${
                actionFeedback.tone === "success"
                  ? "text-green-700"
                  : actionFeedback.tone === "warning"
                    ? "text-amber-700"
                    : "text-red-700"
              }`}
            >
              {actionFeedback.message}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1280px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-600">
                  <th className="w-12 px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label="Seleccionar capturas visibles"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAllVisible}
                    />
                  </th>
                  <th className="px-3 py-3">Grupo</th>
                  <th className="px-3 py-3">Nivel educativo</th>
                  <th className="px-3 py-3">Materia</th>
                  <th className="px-3 py-3">Maestro</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="min-w-[280px] px-3 py-3">Observación</th>
                  <th className="px-3 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 align-middle">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Seleccionar ${row.group} ${row.subject}`}
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                      />
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-900">{row.group}</td>
                    <td className="px-3 py-3 text-slate-700">{row.level}</td>
                    <td className="px-3 py-3 text-slate-700">{row.subject}</td>
                    <td className="px-3 py-3 text-slate-700">{row.teacher}</td>
                    <td className="px-3 py-3">
                      <Badge tone={toneByStatus(row.status)}>{row.status}</Badge>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{row.observation}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-nowrap gap-2 whitespace-nowrap">
                        <Button variant="ghost" onClick={() => handleReviewRow(row.id)}>Revisar</Button>
                        <Button variant="secondary" onClick={() => handleRowValidate(row.id)}>Validar</Button>
                        <Button variant="secondary" onClick={() => handleRowCorrection(row.id)}>Solicitar corrección</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-sm text-slate-500">
                      No hay capturas que coincidan con los filtros actuales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Detalle de captura seleccionada" description="Consulta en la misma pantalla sin salir de la bandeja de revisión.">
          {selectedDetail ? (
            <div className="space-y-4">
              <div className="grid gap-3 text-sm text-slate-700 lg:grid-cols-2">
                <p><span className="font-medium text-slate-900">Grupo:</span> {selectedDetail.group}</p>
                <p><span className="font-medium text-slate-900">Nivel educativo:</span> {selectedDetail.level}</p>
                <p><span className="font-medium text-slate-900">Materia:</span> {selectedDetail.subject}</p>
                <p><span className="font-medium text-slate-900">Maestro:</span> {selectedDetail.teacher}</p>
                <p>
                  <span className="font-medium text-slate-900">Estado:</span>{" "}
                  <Badge tone={toneByStatus(selectedDetail.status)}>{selectedDetail.status}</Badge>
                </p>
                <p><span className="font-medium text-slate-900">Observación:</span> {selectedDetail.observation}</p>
                <p className="lg:col-span-2">
                  <span className="font-medium text-slate-900">Recomendación administrativa:</span>{" "}
                  {recommendationByStatus(selectedDetail.status)}
                </p>
              </div>

              <section>
                <h4 className="text-sm font-semibold text-slate-900">Alumnos incluidos en la captura</h4>
                <div className="mt-2 overflow-x-auto rounded-md border border-slate-200">
                  <table className="w-full min-w-[720px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-600">
                        <th className="px-3 py-2.5">Alumno</th>
                        <th className="px-3 py-2.5">Calificación final</th>
                        <th className="px-3 py-2.5">Estado</th>
                        <th className="px-3 py-2.5">Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailStudents.map((row) => (
                        <tr key={row.id} className="border-b border-slate-100 align-middle">
                          <td className="px-3 py-2.5 font-medium text-slate-900">{row.studentName}</td>
                          <td className="px-3 py-2.5 text-slate-700">{row.finalGradeLabel}</td>
                          <td className="px-3 py-2.5">
                            <Badge tone={toneByStudentStatus(row.status)}>{row.status}</Badge>
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{row.observation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              Selecciona Revisar en cualquier fila para visualizar el detalle de la captura en esta misma pantalla.
            </p>
          )}
        </Card>

        <Card title="Criterios de revisión" description="Guía rápida para validar capturas antes de actas y boletas.">
          <ul className="space-y-2 text-sm text-slate-700">
            <li><span className="font-medium text-slate-900">Pendiente:</span> faltan datos por capturar.</li>
            <li><span className="font-medium text-slate-900">Con error:</span> la calificación no cumple validaciones.</li>
            <li><span className="font-medium text-slate-900">Duplicado:</span> existe más de una captura para el mismo alumno, materia y trimestre.</li>
            <li><span className="font-medium text-slate-900">Revisar escala:</span> el maestro debe confirmar que la escala es correcta.</li>
            <li><span className="font-medium text-slate-900">Validado:</span> la captura puede usarse para actas y boletas.</li>
          </ul>
        </Card>

        <section className="flex justify-end">
          <Button href="/demo/admin" variant="secondary">
            Volver al panel administrativo
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
