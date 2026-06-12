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

export default function DemoMaestroCapturaPage() {
  const activeTerm = terms.find((term) => term.status === "active");
  const prepWindow = captureWindows.find(
    (window) => window.level === "preparatoria" && window.termId === activeTerm?.id,
  );
  const prepGroup = officialGroups.find((group) => group.id === "group_1a_prep");
  const prepSubject = subjects.find((subject) => subject.id === "subject_math_prep");
  const groupStudents = students.filter((student) => student.officialGroupId === "group_1a_prep");

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
                {groupStudents.map((student, index) => (
                  <tr key={student.id} className="border-b border-slate-100 align-middle">
                    <td
                      title={student.fullName}
                      className="sticky left-0 z-10 min-w-[220px] max-w-[220px] border-r border-slate-200 bg-white px-3 py-2.5 font-medium text-slate-900"
                    >
                      <span className="block truncate">{student.fullName}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue={index % 2} className="w-16 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue="" className="w-20 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue="" className="w-20 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue="" className="w-20 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue="" className="w-20 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5">
                      <input disabled defaultValue="" className="w-24 rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700" />
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <Badge tone="amber">Pendiente</Badge>
                    </td>
                  </tr>
                ))}
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
