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

  const [captureByStudent, setCaptureByStudent] = useState<Record<string, CaptureInputs>>(() => (
    groupStudents.reduce<Record<string, CaptureInputs>>((acc, student, index) => {
      acc[student.id] = {
        inasistencias: String(index % 2),
        participacion: "",
        proyecto: "",
        trabajos: "",
        examen: "",
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
    const normalized = normalizeGradeInput(value);
    setCaptureByStudent((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: normalized,
      },
    }));
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

        <Card title="Lista de alumnos" description="Tabla visual inicial de captura (sin guardado todavía).">
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
