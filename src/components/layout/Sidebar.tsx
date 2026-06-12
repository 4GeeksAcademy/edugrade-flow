import { Badge } from "@/components/ui/Badge";

type SidebarProps = {
  systemName: string;
  activeModule?: (typeof modules)[number];
};

const modules = [
  "Dashboard",
  "Capturas",
  "Actas",
  "Boletas",
  "Configuración",
] as const;

export function Sidebar({ systemName, activeModule = "Dashboard" }: SidebarProps) {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Sistema</p>
        <h1 className="mt-1 text-lg font-semibold text-slate-900">{systemName}</h1>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {modules.map((item) => {
          const isActive = item === activeModule;

          return (
            <button
              key={item}
              type="button"
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "border border-blue-200 bg-blue-50 font-medium text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item}
              {isActive ? <Badge tone="blue">Activo</Badge> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
