import { AppShell } from "@/components/layout/AppShell";
import { CaptureStatusTable, type CaptureStatusRow } from "@/components/admin/CaptureStatusTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  captureWindows,
  englishLevels,
  gradeEntries,
  officialGroups,
  students,
  subjects,
  teachers,
  terms,
} from "@/data";

function getProgressPercentage(entry: (typeof gradeEntries)[number]) {
  const fields = [
    entry.participation,
    entry.project,
    entry.assignments,
    entry.exam,
    entry.finalGrade,
  ];
  const completedFields = fields.filter((value) => value !== null).length;

  return Math.round((completedFields / fields.length) * 100);
}

function resolveCaptureStatus(
  entries: (typeof gradeEntries),
  baseProgress: number,
): CaptureStatusRow["status"] {
  const hasDuplicated = entries.some((entry) => entry.status === "duplicado");
  if (hasDuplicated) return "Duplicado";

  const hasError = entries.some((entry) => entry.status === "con error");
  if (hasError) return "Con error";

  if (baseProgress === 100) return "Completo";
  if (baseProgress === 0) return "Pendiente";

  const hasPending = entries.some((entry) => entry.status === "pendiente");
  if (hasPending) return "Pendiente";

  return "En progreso";
}

export default function DemoAdminPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const activeGroups = officialGroups.filter((group) => group.isActive);
  const activeStudents = students.filter((student) => student.isActive);
  const activeTeachers = teachers.filter((teacher) => teacher.isActive);
  const activeSubjects = subjects.filter((subject) => subject.isActive);

  const activeTermEntries = gradeEntries.filter((entry) => entry.termId === activeTerm?.id);

  const groupLevelMap = new Map(officialGroups.map((group) => [group.id, group.level]));
  const activeCaptureLevels = new Set(
    captureWindows
      .filter((window) => window.status === "Activo" && window.termId === activeTerm?.id)
      .map((window) => window.level),
  );
  const hasActiveCaptureWindow = activeCaptureLevels.size > 0;
  const visibleTermEntries = hasActiveCaptureWindow
    ? activeTermEntries.filter((entry) => {
        const groupLevel = groupLevelMap.get(entry.officialGroupId);
        return groupLevel ? activeCaptureLevels.has(groupLevel) : false;
      })
    : [];

  const pendingCount = visibleTermEntries.filter((entry) => entry.status === "pendiente").length;
  const errorCount = visibleTermEntries.filter((entry) => entry.status === "con error").length;
  const duplicatedCount = visibleTermEntries.filter((entry) => entry.status === "duplicado").length;

  const groupMap = new Map(officialGroups.map((group) => [group.id, group.name]));
  const subjectMap = new Map(subjects.map((subject) => [subject.id, subject.name]));
  const teacherMap = new Map(teachers.map((teacher) => [teacher.id, teacher.fullName]));
  const termMap = new Map(terms.map((term) => [term.id, term.name]));

  const groupedEntries = new Map<string, (typeof gradeEntries)>();

  for (const entry of visibleTermEntries) {
    const key = `${entry.officialGroupId}__${entry.subjectId}__${entry.teacherId}`;
    const existing = groupedEntries.get(key);

    if (existing) {
      existing.push(entry);
    } else {
      groupedEntries.set(key, [entry]);
    }
  }

  const captureRows: CaptureStatusRow[] = Array.from(groupedEntries.entries()).map(
    ([key, entries]) => {
      const [groupId, subjectId, teacherId] = key.split("__");
      const preferredEntry =
        entries.find((entry) => entry.status !== "duplicado") ?? entries[0];
      const progress = getProgressPercentage(preferredEntry);

      return {
        id: key,
        group: groupMap.get(groupId) ?? "Grupo no definido",
        subject: subjectMap.get(subjectId) ?? "Materia no definida",
        teacher: teacherMap.get(teacherId) ?? "Maestro no definido",
        progress,
        status: resolveCaptureStatus(entries, progress),
      };
    },
  );

  const activityItems = [
    `Captura validada para Matemáticas 1A Secundaria.`,
    `Duplicado detectado en Inglés ${englishLevels[1]?.name ?? "Nivel B"}.`,
    `Acta pendiente para Historia 2A Preparatoria.`,
  ];

  const completedCount = captureRows.filter((row) => row.status === "Completo").length;

  const trimesterStatus = [
    {
      label: "Captura de calificaciones",
      value: `${completedCount} de ${captureRows.length} materias con captura completa`,
      status: completedCount === captureRows.length ? "completo" : "en progreso",
    },
    {
      label: "Validación administrativa",
      value: `${errorCount + duplicatedCount} incidencias por revisar`,
      status: errorCount + duplicatedCount > 0 ? "pendiente" : "completo",
    },
    {
      label: "Actas generadas",
      value: "Pendiente de generación",
      status: "pendiente",
    },
    {
      label: "Boletas generadas",
      value: "Pendiente de generación",
      status: "pendiente",
    },
  ] as const;

  const captureWindowsByLevel = captureWindows.map((window) => ({
    ...window,
    levelLabel: window.level === "secundaria" ? "Secundaria" : "Preparatoria",
    termLabel: termMap.get(window.termId) ?? "Trimestre no definido",
  }));

  return (
    <AppShell
      topbarTitle="Panel administrativo"
      topbarSubtitle={`Ciclo escolar 2025-2026 • Ventanas por nivel educativo (${activeTerm?.name ?? "Sin trimestre activo"})`}
      roleLabel="Secretaría / Admin"
      activeModule="Dashboard"
    >
      <div className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5">
          <h3 className="text-sm font-semibold text-slate-900">Acciones rápidas</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary">Revisar pendientes</Button>
            <Button variant="secondary">Validar capturas</Button>
            <Button variant="secondary">Generar acta</Button>
            <Button variant="secondary">Generar boleta</Button>
          </div>
        </section>

        <section>
          <Card
            title="Ventanas de captura"
            description="Habilitación por nivel educativo y trimestre."
          >
            <div className="grid gap-3 lg:grid-cols-2">
              {captureWindowsByLevel.map((window) => (
                <div
                  key={window.id}
                  className="rounded-md border border-slate-200 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{window.levelLabel}</p>
                    <Badge tone={window.status === "Activo" ? "green" : "slate"}>
                      {window.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{window.termLabel}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Grupos activos"
            value={activeGroups.length}
            helperText="Estructura oficial del ciclo"
            status="completo"
          />
          <MetricCard
            title="Alumnos activos"
            value={activeStudents.length}
            helperText="Registros académicos vigentes"
            status="validado"
          />
          <MetricCard
            title="Maestros activos"
            value={activeTeachers.length}
            helperText="Docentes con asignación"
            status="completo"
          />
          <MetricCard
            title="Materias registradas"
            value={activeSubjects.length}
            helperText="Secundaria y preparatoria"
            status="completo"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <MetricCard
            title="Capturas pendientes"
            value={pendingCount}
            helperText="Filas por completar"
            status={pendingCount > 0 ? "pendiente" : "completo"}
          />
          <MetricCard
            title="Capturas con error"
            value={errorCount}
            helperText="Registros con validación fallida"
            status={errorCount > 0 ? "con error" : "completo"}
          />
          <MetricCard
            title="Duplicados detectados"
            value={duplicatedCount}
            helperText="Casos repetidos en el trimestre"
            status={duplicatedCount > 0 ? "duplicado" : "completo"}
          />
        </section>

        <section>
          <Card
            title="Estado de captura"
            description="Seguimiento de capturas con ventana activa."
          >
            {hasActiveCaptureWindow ? (
              <CaptureStatusTable rows={captureRows} />
            ) : (
              <p className="text-sm text-slate-600">No hay ventanas de captura activas</p>
            )}
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card title="Actividad reciente" description="Eventos relevantes del flujo de revisión administrativa.">
            <ul className="space-y-2 text-sm text-slate-700">
              {activityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card title="Estado del trimestre" description="Resumen operativo del avance actual.">
            <ul className="space-y-3">
              {trimesterStatus.map((item) => (
                <li key={item.label} className="rounded-md border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-800">{item.label}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{item.value}</p>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="flex justify-end">
          <Button href="/demo" variant="secondary">
            Volver a selección de rol
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
