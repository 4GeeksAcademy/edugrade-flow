"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  captureWindows,
  officialGroups,
  students,
  subjects,
  terms,
} from "@/data";

type CaptureInputs = {
  inasistencias: string;
  participacion: string;
  proyecto: string;
  trabajos: string;
  examen: string;
};

type RowStatus = "Pendiente" | "Completo" | "Con error";
type SaveFeedbackTone = "success" | "warning" | "error";

const emptyCaptureRow: CaptureInputs = {
  inasistencias: "",
  participacion: "",
  proyecto: "",
  trabajos: "",
  examen: "",
};

function normalizeNumberInput(value: string) {
  const noSpaces = value.replace(/\s+/g, "");
  const sanitized = noSpaces.replace(/[^0-9.]/g, "");
  const parts = sanitized.split(".");

  if (parts.length <= 1) {
    return sanitized;
  }

  return `${parts[0]}.${parts.slice(1).join("")}`;
}

function normalizeGradeInput(value: string) {
  const normalized = normalizeNumberInput(value);
  if (normalized === "") {
    return "";
  }

  const numeric = Number(normalized);
  if (Number.isNaN(numeric)) {
    return "";
  }

  if (numeric > 100) {
    return "100";
  }

  return normalized;
}

function parseField(value: string) {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function resolveRowResult(row: CaptureInputs) {
  const participacion = parseField(row.participacion);
  const proyecto = parseField(row.proyecto);
  const trabajos = parseField(row.trabajos);
  const examen = parseField(row.examen);

  const hasMissing = [participacion, proyecto, trabajos, examen].some((value) => value === null);
  const finalScore = (participacion ?? 0) + (proyecto ?? 0) + (trabajos ?? 0) + (examen ?? 0);

  let status: RowStatus = "Pendiente";
  if (!hasMissing) {
    status = finalScore > 100 ? "Con error" : "Completo";
  }

  return {
    status,
    hasMissing,
    finalScore,
    finalLabel: hasMissing ? "-" : Number(finalScore.toFixed(2)).toString(),
  };
}

export default function DemoMaestroCapturaPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const prepWindow = captureWindows.find(
    (window) => window.level === "preparatoria" && window.termId === activeTerm?.id,
  );
  const prepGroup = officialGroups.find((group) => group.id === "group_1a_prep");
  const prepSubject = subjects.find((subject) => subject.id === "subject_math_prep");
  const groupStudents = students.filter((student) => student.officialGroupId === "group_1a_prep");
  const [pasteValue, setPasteValue] = useState("");
  const [pasteFeedback, setPasteFeedback] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<{ tone: SaveFeedbackTone; message: string } | null>(null);

  const [captureByStudent, setCaptureByStudent] = useState<Record<string, CaptureInputs>>(() => (
    groupStudents.reduce<Record<string, CaptureInputs>>((acc, student, index) => {
      acc[student.id] = {
        ...emptyCaptureRow,
        inasistencias: String(index % 2),
      };
      return acc;
    }, {})
  ));

  const summary = useMemo(() => {
    return groupStudents.reduce(
      (acc, student) => {
        const row = captureByStudent[student.id];
        if (!row) {
          acc.pendientes += 1;
          return acc;
        }

        const result = resolveRowResult(row);
        if (result.status === "Completo") {
          acc.completos += 1;
        } else if (result.status === "Con error") {
          acc.conError += 1;
        } else {
          acc.pendientes += 1;
        }

        return acc;
      },
      {
        total: groupStudents.length,
        completos: 0,
        pendientes: 0,
        conError: 0,
      },
    );
  }, [captureByStudent, groupStudents]);

  const handleInasistenciasChange = (studentId: string, value: string) => {
    setSaveFeedback(null);
    const normalized = normalizeNumberInput(value);
    setCaptureByStudent((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        inasistencias: normalized,
      },
    }));
  };

  const handleGradeChange = (studentId: string, field: "participacion" | "proyecto" | "trabajos" | "examen", value: string) => {
    setSaveFeedback(null);
    const normalized = normalizeGradeInput(value);
    setCaptureByStudent((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: normalized,
      },
    }));
  };

  const handleApplyPaste = () => {
    setSaveFeedback(null);
    const lines = pasteValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      setPasteFeedback({ tone: "error", message: "No se detectaron datos válidos para pegar." });
      return;
    }

    let appliedFields = 0;
    const next = { ...captureByStudent };
    const fieldOrder: Array<keyof CaptureInputs> = ["inasistencias", "participacion", "proyecto", "trabajos", "examen"];

    lines.slice(0, groupStudents.length).forEach((line, rowIndex) => {
      const columns = line
        .split(/[\t,\s]+/)
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
        .slice(0, 5);

      if (columns.length === 0) {
        return;
      }

      const studentId = groupStudents[rowIndex]?.id;
      if (!studentId || !next[studentId]) {
        return;
      }

      const updatedRow = { ...next[studentId] };

      columns.forEach((columnValue, columnIndex) => {
        const field = fieldOrder[columnIndex];
        if (!field) {
          return;
        }

        if (field === "inasistencias") {
          updatedRow[field] = normalizeNumberInput(columnValue);
        } else {
          updatedRow[field] = normalizeGradeInput(columnValue);
        }

        appliedFields += 1;
      });

      next[studentId] = updatedRow;
    });

    if (appliedFields > 0) {
      setCaptureByStudent(next);
    }

    if (appliedFields > 0) {
      setPasteValue("");
      setPasteFeedback({ tone: "success", message: "Datos pegados correctamente." });
      return;
    }

    setPasteFeedback({ tone: "error", message: "No se detectaron datos válidos para pegar." });
  };

  const handleClearRow = (studentId: string) => {
    setSaveFeedback(null);
    setPasteFeedback(null);
    setCaptureByStudent((prev) => ({
      ...prev,
      [studentId]: { ...emptyCaptureRow },
    }));
  };

  const handleClearTable = () => {
    setSaveFeedback(null);
    setPasteFeedback(null);
    setCaptureByStudent((prev) => {
      const next = { ...prev };
      groupStudents.forEach((student) => {
        if (next[student.id]) {
          next[student.id] = { ...emptyCaptureRow };
        }
      });
      return next;
    });
  };

  const handleSimulatedSave = () => {
    if (summary.pendientes > 0) {
      setSaveFeedback({ tone: "warning", message: "No puedes guardar: hay alumnos pendientes." });
      return;
    }

    if (summary.conError > 0) {
      setSaveFeedback({ tone: "error", message: "No puedes guardar: hay errores en la captura." });
      return;
    }

    setSaveFeedback({ tone: "success", message: "Captura lista para guardar. Simulación completada correctamente." });
  };

  return (
    <AppShell
      topbarTitle="Panel del maestro"
      topbarSubtitle={`Ciclo escolar 2025-2026 • Captura activa: Preparatoria (${activeTerm?.name ?? "II Trimestre"})`}
      roleLabel="Maestro"
      activeModule="Capturas"
    >
      <div className="space-y-6">
        <Card title="Captura de calificaciones" description="Pantalla inicial de captura para el grupo y materia seleccionados.">
          <div className="grid gap-3 text-sm text-slate-700 lg:grid-cols-2">
            <p>Materia: {prepSubject?.name ?? "Matemáticas"}</p>
            <p>Grupo: {prepGroup?.name ?? "1A Preparatoria"}</p>
            <p>Nivel educativo: Preparatoria</p>
            <p>Trimestre: {activeTerm?.name ?? "II Trimestre"}</p>
            <p>Estado de ventana: {prepWindow?.status ?? "Activo"}</p>
            <div>
              <Badge tone={prepWindow?.status === "Activo" ? "green" : "slate"}>
                {prepWindow?.status ?? "Activo"}
              </Badge>
            </div>
          </div>

          <p className="mt-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Recuerda capturar calificaciones en escala de 0 a 100 para preparatoria.
          </p>
        </Card>

        <Card title="Lista de alumnos" description="Captura de calificaciones con cálculo automático. El guardado aún es simulado.">
          <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-800">Pegar desde Excel</p>
            <p className="mt-1 text-xs text-slate-600">
              Copia desde Excel en el orden: Inasistencias, Participación, Proyecto, Trabajos, Examen.
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <textarea
                value={pasteValue}
                onChange={(event) => setPasteValue(event.target.value)}
                rows={4}
                placeholder={"0\t10\t30\t30\t20\n1\t15\t25\t25\t30"}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
              />
              <p className="text-xs text-slate-600">
                Ejemplo: <span className="font-mono text-slate-800">0 10 30 30 20</span>
              </p>
              {pasteFeedback && (
                <p className={`text-xs ${pasteFeedback.tone === "success" ? "text-green-700" : "text-red-700"}`}>
                  {pasteFeedback.message}
                </p>
              )}
              <div>
                <button
                  type="button"
                  onClick={handleApplyPaste}
                  className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Aplicar pegado
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 grid gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              Alumnos totales: <span className="font-semibold text-slate-900">{summary.total}</span>
            </p>
            <p>
              Completos: <span className="font-semibold text-green-700">{summary.completos}</span>
            </p>
            <p>
              Pendientes: <span className="font-semibold text-amber-700">{summary.pendientes}</span>
            </p>
            <p>
              Con error: <span className="font-semibold text-red-700">{summary.conError}</span>
            </p>
          </div>

          <div className="max-w-full overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full min-w-[1060px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-600">
                  <th className="sticky left-0 z-20 min-w-[220px] max-w-[220px] border-r border-slate-200 bg-slate-50 px-3 py-2.5 whitespace-nowrap">
                    Alumno
                  </th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Inasistencias</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Participación</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Proyecto</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Trabajos</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Examen</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">Calificación final</th>
                  <th className="px-3 py-2.5 whitespace-nowrap min-w-[120px]">Estado</th>
                  <th className="px-3 py-2.5 whitespace-nowrap min-w-[110px]">Acción</th>
                </tr>
              </thead>
              <tbody>
                {groupStudents.map((student) => {
                  const row = captureByStudent[student.id];
                  const rowResult = resolveRowResult(row);
                  const statusTone = rowResult.status === "Completo"
                    ? "green"
                    : rowResult.status === "Con error"
                      ? "red"
                      : "amber";

                  return (
                    <tr key={student.id} className="border-b border-slate-100 align-middle">
                      <td
                        title={student.fullName}
                        className="sticky left-0 z-10 min-w-[220px] max-w-[220px] border-r border-slate-200 bg-white px-3 py-2.5 font-medium text-slate-900"
                      >
                        <span className="block truncate">{student.fullName}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.inasistencias}
                          onChange={(event) => handleInasistenciasChange(student.id, event.target.value)}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.participacion}
                          onChange={(event) => handleGradeChange(student.id, "participacion", event.target.value)}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={100}
                          className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.proyecto}
                          onChange={(event) => handleGradeChange(student.id, "proyecto", event.target.value)}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={100}
                          className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.trabajos}
                          onChange={(event) => handleGradeChange(student.id, "trabajos", event.target.value)}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={100}
                          className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.examen}
                          onChange={(event) => handleGradeChange(student.id, "examen", event.target.value)}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={100}
                          className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex min-h-7 w-24 items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700">
                          {rowResult.finalLabel}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <Badge tone={statusTone}>{rowResult.status}</Badge>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleClearRow(student.id)}
                          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          Limpiar fila
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleClearTable}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Limpiar tabla
              </button>
              <button
                type="button"
                onClick={handleSimulatedSave}
                className="inline-flex items-center rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                Guardar captura
              </button>
            </div>

            {saveFeedback && (
              <p
                className={`text-xs font-medium ${
                  saveFeedback.tone === "success"
                    ? "text-green-700"
                    : saveFeedback.tone === "warning"
                      ? "text-amber-700"
                      : "text-red-700"
                }`}
              >
                {saveFeedback.message}
              </p>
            )}
          </div>
        </Card>

        <section className="flex justify-end">
          <Button href="/demo/maestro" variant="secondary">
            Volver al panel del maestro
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
