"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { gradeEntries, officialGroups, students, subjects, terms } from "@/data";

type DocumentType = "Acta" | "Boleta";
type DocumentStatus = "Listo para generar" | "Pendiente de validación" | "Generado en demo";

type DocumentRow = {
  id: string;
  groupId: string;
  groupName: string;
  levelLabel: "Secundaria" | "Preparatoria";
  documentType: DocumentType;
  status: DocumentStatus;
  validatedCaptures: number;
  observation: string;
  studentCount: number;
  subjectCount: number;
  subjectNames: string[];
};

type Feedback = {
  tone: "success" | "warning";
  message: string;
};

function statusTone(status: DocumentStatus) {
  if (status === "Generado en demo") return "green" as const;
  if (status === "Listo para generar") return "blue" as const;
  return "amber" as const;
}

export default function DemoAdminDocumentosPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const activeGroups = officialGroups.filter((group) => group.isActive);

  const [levelFilter, setLevelFilter] = useState<"Todos" | "Secundaria" | "Preparatoria">("Todos");
  const [groupFilter, setGroupFilter] = useState<string>("Todos");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<"Todos" | DocumentType>("Todos");
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [previewRowId, setPreviewRowId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const subjectMap = useMemo(() => new Map(subjects.map((subject) => [subject.id, subject.name])), []);

  const groupedByGroup = useMemo(() => {
    const map = new Map<string, (typeof gradeEntries)>();

    gradeEntries
      .filter((entry) => entry.termId === activeTerm?.id)
      .forEach((entry) => {
        const existing = map.get(entry.officialGroupId);
        if (existing) {
          existing.push(entry);
        } else {
          map.set(entry.officialGroupId, [entry]);
        }
      });

    return map;
  }, [activeTerm?.id]);

  const documentRows = useMemo<DocumentRow[]>(() => {
    const rows: DocumentRow[] = [];

    activeGroups.forEach((group) => {
      const entries = groupedByGroup.get(group.id) ?? [];
      const validatedEntries = entries.filter((entry) => entry.status === "validado" || entry.status === "completo");
      const hasBlockingStatus = entries.some((entry) => (
        entry.status === "pendiente" || entry.status === "con error" || entry.status === "duplicado"
      ));
      const baseStatus: DocumentStatus = validatedEntries.length > 0 && !hasBlockingStatus
        ? "Listo para generar"
        : "Pendiente de validación";

      const subjectNames = Array.from(
        new Set(
          entries
            .map((entry) => subjectMap.get(entry.subjectId))
            .filter((name): name is string => Boolean(name)),
        ),
      );

      const studentCount = students.filter((student) => student.officialGroupId === group.id && student.isActive).length;

      const buildRow = (documentType: DocumentType): DocumentRow => {
        const rowId = `${group.id}__${documentType.toLowerCase()}`;
        const isGenerated = generatedIds.includes(rowId);
        const finalStatus: DocumentStatus = isGenerated ? "Generado en demo" : baseStatus;

        return {
          id: rowId,
          groupId: group.id,
          groupName: group.name,
          levelLabel: group.level === "secundaria" ? "Secundaria" : "Preparatoria",
          documentType,
          status: finalStatus,
          validatedCaptures: validatedEntries.length,
          observation: finalStatus === "Pendiente de validación"
            ? "Faltan validaciones administrativas antes de generar."
            : finalStatus === "Generado en demo"
              ? "Documento generado en flujo simulado."
              : "Cumple condiciones para generación simulada.",
          studentCount,
          subjectCount: subjectNames.length,
          subjectNames,
        };
      };

      rows.push(buildRow("Acta"));
      rows.push(buildRow("Boleta"));
    });

    return rows;
  }, [activeGroups, generatedIds, groupedByGroup, subjectMap]);

  const filteredRows = useMemo(() => {
    return documentRows.filter((row) => {
      if (levelFilter !== "Todos" && row.levelLabel !== levelFilter) return false;
      if (groupFilter !== "Todos" && row.groupName !== groupFilter) return false;
      if (documentTypeFilter !== "Todos" && row.documentType !== documentTypeFilter) return false;
      return true;
    });
  }, [documentRows, levelFilter, groupFilter, documentTypeFilter]);

  const totals = useMemo(() => {
    const actasListas = documentRows.filter((row) => row.documentType === "Acta" && row.status !== "Pendiente de validación").length;
    const boletasListas = documentRows.filter((row) => row.documentType === "Boleta" && row.status !== "Pendiente de validación").length;

    return {
      groupsAvailable: activeGroups.length,
      validatedCaptures: gradeEntries.filter((entry) => entry.termId === activeTerm?.id && (entry.status === "validado" || entry.status === "completo")).length,
      actasListas,
      boletasListas,
      pendingValidation: documentRows.filter((row) => row.status === "Pendiente de validación").length,
    };
  }, [activeGroups.length, activeTerm?.id, documentRows]);

  const previewRow = previewRowId
    ? documentRows.find((row) => row.id === previewRowId) ?? null
    : null;

  const handlePreview = (rowId: string) => {
    setPreviewRowId(rowId);
    setFeedback(null);
  };

  const handleGenerateDemo = (rowId: string) => {
    const row = documentRows.find((item) => item.id === rowId);
    if (!row) {
      return;
    }

    if (row.status === "Pendiente de validación") {
      setFeedback({ tone: "warning", message: "No se puede generar: hay validaciones pendientes." });
      return;
    }

    setGeneratedIds((prev) => (prev.includes(rowId) ? prev : [...prev, rowId]));
    setFeedback({ tone: "success", message: "Documento generado correctamente en demo." });
    setPreviewRowId(rowId);
  };

  return (
    <AppShell
      topbarTitle="Actas y boletas"
      topbarSubtitle={`Ciclo escolar 2025-2026 • II Trimestre (${activeTerm?.name ?? "II Trimestre"})`}
      roleLabel="Secretaría / Admin"
      activeModule="Actas"
    >
      <div className="space-y-6">
        <Card>
          <p className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Generación simulada con datos ficticios.
          </p>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Grupos disponibles</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.groupsAvailable}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Capturas validadas</p>
            <p className="mt-2 text-2xl font-semibold text-green-700">{totals.validatedCaptures}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Actas listas</p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">{totals.actasListas}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Boletas listas</p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">{totals.boletasListas}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pendientes de validación</p>
            <p className="mt-2 text-2xl font-semibold text-amber-700">{totals.pendingValidation}</p>
          </Card>
        </section>

        <Card title="Filtros" description="Refina la disponibilidad por nivel, grupo y tipo de documento.">
          <div className="grid gap-3 md:grid-cols-3">
            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Nivel educativo</span>
              <select
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value as "Todos" | "Secundaria" | "Preparatoria")}
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
                {activeGroups.map((group) => (
                  <option key={group.id} value={group.name}>{group.name}</option>
                ))}
              </select>
            </label>

            <label className="text-xs text-slate-700">
              <span className="mb-1 block font-medium">Tipo de documento</span>
              <select
                value={documentTypeFilter}
                onChange={(event) => setDocumentTypeFilter(event.target.value as "Todos" | DocumentType)}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
              >
                <option value="Todos">Todos</option>
                <option value="Acta">Acta</option>
                <option value="Boleta">Boleta</option>
              </select>
            </label>
          </div>
        </Card>

        <Card title="Documentos disponibles" description="Listado operativo para vista previa y generación simulada.">
          {feedback && (
            <p className={`mb-4 text-sm font-medium ${feedback.tone === "success" ? "text-green-700" : "text-amber-700"}`}>
              {feedback.message}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-600">
                  <th className="px-3 py-3">Grupo</th>
                  <th className="px-3 py-3">Nivel educativo</th>
                  <th className="px-3 py-3">Tipo de documento</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="px-3 py-3">Capturas validadas</th>
                  <th className="px-3 py-3">Observación</th>
                  <th className="px-3 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 align-middle">
                    <td className="px-3 py-3 font-medium text-slate-900">{row.groupName}</td>
                    <td className="px-3 py-3 text-slate-700">{row.levelLabel}</td>
                    <td className="px-3 py-3 text-slate-700">{row.documentType}</td>
                    <td className="px-3 py-3">
                      <Badge tone={statusTone(row.status)}>{row.status}</Badge>
                    </td>
                    <td className="px-3 py-3 text-slate-700">{row.validatedCaptures}</td>
                    <td className="px-3 py-3 text-slate-600">{row.observation}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-nowrap gap-2 whitespace-nowrap">
                        <Button variant="ghost" onClick={() => handlePreview(row.id)}>Vista previa</Button>
                        <Button variant="secondary" onClick={() => handleGenerateDemo(row.id)}>Generar demo</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-center text-sm text-slate-500">
                      No hay documentos disponibles para los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Vista previa del documento" description="Vista previa simulada, no es documento oficial.">
          {previewRow ? (
            <div className="grid gap-3 text-sm text-slate-700 lg:grid-cols-2">
              <p><span className="font-medium text-slate-900">Grupo:</span> {previewRow.groupName}</p>
              <p><span className="font-medium text-slate-900">Nivel:</span> {previewRow.levelLabel}</p>
              <p><span className="font-medium text-slate-900">Tipo de documento:</span> {previewRow.documentType}</p>
              <p><span className="font-medium text-slate-900">Trimestre:</span> {activeTerm?.name ?? "II Trimestre"}</p>
              <p><span className="font-medium text-slate-900">Alumnos incluidos:</span> {previewRow.studentCount}</p>
              <p><span className="font-medium text-slate-900">Materias incluidas:</span> {previewRow.subjectCount}</p>
              <p className="lg:col-span-2">
                <span className="font-medium text-slate-900">Listado de materias:</span>{" "}
                {previewRow.subjectNames.length > 0 ? previewRow.subjectNames.join(", ") : "Sin materias detectadas"}
              </p>
              <p className="lg:col-span-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Vista previa simulada, no es documento oficial.
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              Selecciona Vista previa en cualquier fila para consultar el detalle del documento simulado.
            </p>
          )}
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
