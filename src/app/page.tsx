import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  gradeEntries,
  officialGroups,
  students,
  teachers,
  terms,
} from "@/data";

export default function Home() {
  const activeTerm = terms.find((term) => term.status === "active");
  const pendingGrades = gradeEntries.filter((entry) => entry.status === "pendiente").length;
  const errorGrades = gradeEntries.filter((entry) => entry.status === "con error").length;
  const duplicatedGrades = gradeEntries.filter(
    (entry) => entry.status === "duplicado",
  ).length;

  return (
    <AppShell
      topbarTitle="Panel administrativo"
      topbarSubtitle={`Ciclo escolar 2025-2026 • Trimestre activo: ${activeTerm?.name ?? "Sin trimestre activo"}`}
    >
      <div className="space-y-6">
        <section className="grid grid-cols-4 gap-4">
          <MetricCard
            title="Grupos activos"
            value={officialGroups.filter((group) => group.isActive).length}
            helperText="Grupos oficiales del ciclo"
            status="completo"
          />
          <MetricCard
            title="Alumnos activos"
            value={students.filter((student) => student.isActive).length}
            helperText="Alumnos con registro activo"
            status="completo"
          />
          <MetricCard
            title="Maestros activos"
            value={teachers.filter((teacher) => teacher.isActive).length}
            helperText="Usuarios de captura"
            status="validado"
          />
          <MetricCard
            title="Capturas pendientes"
            value={pendingGrades}
            helperText="Registros incompletos"
            status={pendingGrades > 0 ? "pendiente" : "completo"}
          />
        </section>

        <section className="grid grid-cols-3 gap-4">
          <Card title="Estado del proyecto" description="Fase 2: layout base y componentes reutilizables.">
            <div className="space-y-2 text-sm text-slate-700">
              <p>La interfaz actual es una vista de prueba para validar estilo institucional.</p>
              <p>No representa el dashboard final ni la pantalla completa de captura.</p>
            </div>
          </Card>

          <Card title="Estados de ejemplo" description="Vista rapida de badges para validaciones.">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="completo" />
              <StatusBadge status="pendiente" />
              <StatusBadge status="con error" />
              <StatusBadge status="duplicado" />
            </div>
          </Card>

          <Card title="Control de calidad" description="Resumen breve de registros con incidencias.">
            <dl className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <dt>Con error</dt>
                <dd className="font-semibold text-red-700">{errorGrades}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Duplicados</dt>
                <dd className="font-semibold text-orange-700">{duplicatedGrades}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Pendientes</dt>
                <dd className="font-semibold text-amber-700">{pendingGrades}</dd>
              </div>
            </dl>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
