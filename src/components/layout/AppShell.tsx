import type { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type AppShellProps = {
  children: ReactNode;
  topbarTitle: string;
  topbarSubtitle?: string;
};

export function AppShell({ children, topbarTitle, topbarSubtitle }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full min-w-[1200px]">
        <Sidebar systemName="EduGrade Flow" />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title={topbarTitle} subtitle={topbarSubtitle} />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
