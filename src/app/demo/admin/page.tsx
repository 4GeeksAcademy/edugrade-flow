import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { gradeEntries, officialGroups, students, terms } from "@/data";

export default function DemoAdminPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const pendingCount = gradeEntries.filter((entry) => entry.status === "pendiente").length;
  const errorCount = gradeEntries.filter((entry) => entry.status === "con error").length;
  const duplicatedCount = gradeEntries.filter((entry) => entry.status === "duplicado").length;

  return (
    <AppShell
      topbarTitle="Panel administrativo"
      topbarSubtitle={`Ciclo escolar 2025-2026 • Trimestre activo: ${activeTerm?.name ?? "Sin trimestre activo"}`}
      roleLabel="Secretaría / Admin"
      activeModule="Dashboard"
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Grupos activos"
            value={officialGroups.filter((group) => group.isActive).length}
            helperText="Estructura oficial del ciclo"
            status="completo"
          />
          <MetricCard
            title="Alumnos activos"
            value={students.filter((student) => student.isActive).length}
            helperText="Registros académicos vigentes"
            status="validado"
          />
          <MetricCard
            title="Capturas pendientes"
            value={pendingCount}
            helperText="Filas por completar"
            status={pendingCount > 0 ? "pendiente" : "completo"}
          />
          <MetricCard
            title="Incidencias"
            value={errorCount + duplicatedCount}
            helperText="Errores y duplicados detectados"
            status={errorCount + duplicatedCount > 0 ? "con error" : "completo"}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card
            title="Vista inicial del panel administrativo"
            description="Esta pantalla es una base visual de Fase 4 para el dashboard de secretaría/admin."
          >
            <p className="text-sm leading-6 text-slate-700">
              En fases siguientes se incorporarán tablas de seguimiento, acciones
              de revisión por materia y generación completa de documentos.
            </p>
          </Card>

          <Card title="Navegación demo" description="Cambio rápido de rol.">
            <div className="flex flex-col gap-2">
              <Button href="/demo" variant="secondary">
                Volver a selección de rol
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
