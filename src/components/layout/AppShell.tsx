import type { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type AppShellProps = {
  children: ReactNode;
  topbarTitle: string;
  topbarSubtitle?: string;
  roleLabel?: string;
  activeModule?: "Dashboard" | "Capturas" | "Actas" | "Boletas" | "Configuración";
};

export function AppShell({
  children,
  topbarTitle,
  topbarSubtitle,
  roleLabel,
  activeModule,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full">
        <Sidebar systemName="EduGrade Flow" activeModule={activeModule} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title={topbarTitle} subtitle={topbarSubtitle} roleLabel={roleLabel} />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
