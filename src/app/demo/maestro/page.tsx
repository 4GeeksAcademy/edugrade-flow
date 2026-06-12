import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { terms } from "@/data";

export default function DemoMaestroPage() {
  const activeTerm = terms.find((term) => term.status === "active");

  return (
    <AppShell
      topbarTitle="Panel del maestro"
      topbarSubtitle={`Trimestre activo: ${activeTerm?.name ?? "Sin trimestre activo"}`}
      roleLabel="Maestro"
      activeModule="Capturas"
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-2">
          <Card title="Asignación de ejemplo" description="Materia y grupo de referencia para la demo.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Materia: Matemáticas</li>
              <li>Grupo oficial: 2A Secundaria</li>
              <li>Ciclo escolar: 2025-2026</li>
              <li>Periodo de trabajo: II Trimestre</li>
            </ul>
          </Card>

          <Card
            title="Vista inicial de captura"
            description="Esta sección evolucionará a la captura de calificaciones en tabla."
          >
            <p className="text-sm leading-6 text-slate-700">
              En la siguiente fase se añadirá la tabla de alumnos, validación por fila,
              pegado desde Excel y guardado de capturas.
            </p>
          </Card>
        </section>

        <Card title="Navegación demo" description="Regresar al selector de rol.">
          <Button href="/demo" variant="secondary">
            Volver a selección de rol
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
