import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";

type CaptureRowStatus = "Completo" | "Pendiente" | "Con error" | "Duplicado" | "En progreso";

export type CaptureStatusRow = {
  id: string;
  group: string;
  subject: string;
  teacher: string;
  progress: number;
  status: CaptureRowStatus;
};

type CaptureStatusTableProps = {
  rows: CaptureStatusRow[];
};

export function CaptureStatusTable({ rows }: CaptureStatusTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            <th className="px-3 py-3">Grupo</th>
            <th className="px-3 py-3">Materia</th>
            <th className="px-3 py-3">Maestro</th>
            <th className="px-3 py-3">Avance</th>
            <th className="px-3 py-3">Estado</th>
            <th className="px-3 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 align-middle">
              <td className="px-3 py-3 font-medium text-slate-900">{row.group}</td>
              <td className="px-3 py-3 text-slate-700">{row.subject}</td>
              <td className="px-3 py-3 text-slate-700">{row.teacher}</td>
              <td className="px-3 py-3">
                <div className="space-y-1.5">
                  <ProgressBar value={row.progress} variant={row.status} />
                  <p className="text-xs text-slate-500">{row.progress}%</p>
                </div>
              </td>
              <td className="px-3 py-3">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-3 py-3">
                <Button variant="ghost">Revisar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
