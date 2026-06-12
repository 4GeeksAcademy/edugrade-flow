import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type TopbarProps = {
  title: string;
  subtitle?: string;
  roleLabel?: string;
};

export function Topbar({
  title,
  subtitle,
  roleLabel = "Secretaría / Admin",
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Vista actual</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>

        <div className="flex items-center gap-3">
          <Badge tone="blue">{roleLabel}</Badge>
          <Button variant="secondary">Cambiar rol</Button>
        </div>
      </div>
    </header>
  );
}
