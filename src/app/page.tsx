import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
        <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-900/5 lg:p-10">
          <div className="max-w-3xl">
            <Badge tone="blue">Proyecto de portafolio</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
              EduGrade Flow
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 lg:text-lg">
              Sistema web para capturar, validar y generar actas y boletas escolares en Excel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/demo">Ver demo</Button>
              <Button variant="secondary">Ver documentación</Button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card title="Problema actual" description="Situaciones del flujo manual que se buscan resolver.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Captura repetitiva por formularios.</li>
              <li>Revisión manual de respuestas.</li>
              <li>Riesgo de duplicados.</li>
              <li>Generación manual de actas y boletas.</li>
            </ul>
          </Card>

          <Card title="Solución propuesta" description="Enfoque funcional para el nuevo flujo escolar.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Captura en tabla.</li>
              <li>Validación automática.</li>
              <li>Control de trimestre activo.</li>
              <li>Revisión administrativa.</li>
              <li>Generación de documentos en Excel.</li>
            </ul>
          </Card>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card title="Módulos principales" description="Bloques principales del sistema.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Panel secretaria/admin.</li>
              <li>Captura del maestro.</li>
              <li>Validaciones.</li>
              <li>Actas.</li>
              <li>Boletas.</li>
            </ul>
          </Card>

          <Card title="Flujo simplificado" description="Secuencia operativa esperada en el MVP.">
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Secretaría configura trimestre.</li>
              <li>2. Maestro captura calificaciones.</li>
              <li>3. Sistema valida errores.</li>
              <li>4. Secretaría revisa pendientes.</li>
              <li>5. Sistema genera actas y boletas.</li>
            </ol>
          </Card>

          <Card title="Beneficios esperados" description="Impacto funcional del flujo digital.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Menos captura repetitiva.</li>
              <li>Menos errores.</li>
              <li>Mejor control administrativo.</li>
              <li>Mayor rapidez para generar documentos.</li>
              <li>Información más ordenada.</li>
            </ul>
          </Card>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card title="Estado del proyecto" description="Estatus actual de avance para el portafolio.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Documentación completada.</li>
              <li>Datos ficticios creados.</li>
              <li>Base visual creada.</li>
              <li>Siguiente paso: pantallas funcionales.</li>
            </ul>
          </Card>

          <Card title="Aviso de datos ficticios" description="Protección de información.">
            <p className="text-sm leading-6 text-slate-700">
              Este proyecto no usa datos reales ni información sensible de institución,
              alumnos o maestros.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="green">Datos ficticios</Badge>
              <Badge tone="slate">Uso académico</Badge>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
