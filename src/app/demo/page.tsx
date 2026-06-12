import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900">
      <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-10 lg:py-12">
        <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-900/5 lg:p-10">
          <Badge tone="blue">Acceso demo</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
            Selección de rol
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
            Elige el tipo de usuario para recorrer una vista inicial del sistema.
            Esta navegación no usa autenticación real.
          </p>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card title="Entrar como secretaria/admin" description="Vista de control operativo y revisión académica.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Revisar capturas.</li>
              <li>Controlar trimestre activo.</li>
              <li>Validar errores.</li>
              <li>Generar actas y boletas.</li>
            </ul>
            <div className="mt-5">
              <Button href="/demo/admin">Abrir panel administrativo</Button>
            </div>
          </Card>

          <Card title="Entrar como maestro" description="Vista inicial de captura y seguimiento de evaluación.">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Ver materias asignadas.</li>
              <li>Capturar calificaciones.</li>
              <li>Pegar desde Excel.</li>
              <li>Validar errores antes de guardar.</li>
            </ul>
            <div className="mt-5">
              <Button href="/demo/maestro">Abrir panel del maestro</Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
