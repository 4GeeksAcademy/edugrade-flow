import { Card } from "./Card";
import { StatusBadge } from "./StatusBadge";

type MetricCardProps = {
  title: string;
  value: string | number;
  helperText?: string;
  status?: "completo" | "validado" | "pendiente" | "con error" | "duplicado" | "en progreso" | "bloqueado";
};

export function MetricCard({ title, value, helperText, status }: MetricCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-500">{helperText}</p>
        {status && <StatusBadge status={status} />}
      </div>
    </Card>
  );
}
