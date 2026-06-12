import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  captureWindows,
  officialGroups,
  subjects,
  teachers,
  terms,
} from "@/data";

export default function DemoMaestroPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const prepWindow = captureWindows.find(
    (window) => window.level === "preparatoria" && window.termId === activeTerm?.id,
  );
  const secWindow = captureWindows.find(
    (window) => window.level === "secundaria" && window.termId === activeTerm?.id,
  );

  const teacher = teachers.find((item) => item.id === "teacher_a");
  const prepGroup = officialGroups.find((group) => group.id === "group_1a_prep");
  const prepSubject = subjects.find((subject) => subject.id === "subject_math_prep");
  const teacherSubjects = subjects.filter(
    (subject) => teacher?.subjectIds.includes(subject.id) ?? false,
  );

  const assignedCards = teacherSubjects.slice(0, 3).map((subject) => {
    const matchingGroup = officialGroups.find(
      (group) =>
        group.level === subject.level &&
        (teacher?.officialGroupIds.includes(group.id) ?? false),
    );
    const levelWindow = subject.level === "preparatoria" ? prepWindow : secWindow;
    const isAvailable = levelWindow?.status === "Activo";

    return {
      id: `asignacion_${subject.id}_${matchingGroup?.id ?? "sin_grupo"}`,
      group: matchingGroup?.name ?? "Grupo no asignado",
      subject: subject.name,
      status: (isAvailable ? "En progreso" : "Bloqueado") as "En progreso" | "Bloqueado",
      helper: isAvailable ? "Disponible para captura" : "Captura no habilitada",
    };
  });

  return (
    <AppShell
      topbarTitle="Panel del maestro"
      topbarSubtitle={`Ciclo escolar 2025-2026 • Ventana activa por nivel: Preparatoria (${activeTerm?.name ?? "Sin trimestre activo"})`}
      roleLabel="Maestro"
      activeModule="Capturas"
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card title="Contexto de captura" description="Asignación principal para iniciar captura en esta demo.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Maestro: {teacher?.fullName ?? "Maestro A"}</li>
              <li>Nivel educativo: Preparatoria</li>
              <li>Grupo: {prepGroup?.name ?? "1A Preparatoria"}</li>
              <li>Materia: {prepSubject?.name ?? "Matemáticas"}</li>
              <li>Ciclo escolar: 2025-2026</li>
              <li>Trimestre: {activeTerm?.name ?? "II Trimestre"}</li>
              <li>Estado de ventana: {prepWindow?.status ?? "Activo"}</li>
            </ul>

            <p className="mt-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
              Recuerda capturar calificaciones en escala de 0 a 100 para preparatoria.
            </p>
          </Card>

          <Card
            title="Ventana por nivel"
            description="Estado actual de habilitación para el trimestre activo."
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 rounded-md border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-800">Preparatoria</p>
                <Badge tone={prepWindow?.status === "Activo" ? "green" : "slate"}>
                  {prepWindow?.status ?? "Activo"}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-md border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-800">Secundaria</p>
                <Badge tone={secWindow?.status === "Activo" ? "green" : "slate"}>
                  {secWindow?.status ?? "Bloqueado"}
                </Badge>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card
            title="Captura disponible"
            description="La captura está habilitada para preparatoria en II Trimestre."
          >
            <p className="text-sm leading-6 text-slate-700">
              Puedes iniciar la captura para grupos de preparatoria porque su ventana
              se encuentra activa en este periodo.
            </p>
            <div className="mt-4">
              <Button>Iniciar captura</Button>
            </div>
          </Card>

          <Card title="Secundaria bloqueada" description="Aviso informativo por ventana de captura.">
            <p className="text-sm leading-6 text-slate-700">
              Secundaria no tiene captura habilitada para {activeTerm?.name ?? "II Trimestre"}.
            </p>
            <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Para secundaria, la escala vigente es de 1 a 10 cuando la ventana esté activa.
            </p>
          </Card>
        </section>

        <section>
          <Card title="Resumen de materias asignadas" description="Disponibilidad de captura según nivel educativo.">
            <div className="grid gap-3 lg:grid-cols-3">
              {assignedCards.map((item) => (
                <div key={item.id} className="rounded-md border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-900">{item.subject}</p>
                  <p className="mt-1 text-xs text-slate-600">{item.group}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-slate-500">{item.helper}</span>
                  </div>
                </div>
              ))}
            </div>
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
