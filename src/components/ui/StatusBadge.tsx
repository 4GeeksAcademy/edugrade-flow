import type { GradeStatus } from "@/types/academic";

import { Badge } from "./Badge";

type StatusBadgeProps = {
  status: GradeStatus | "en progreso" | "bloqueado";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "completo" || normalizedStatus === "validado") {
    return <Badge tone="green">{status}</Badge>;
  }

  if (normalizedStatus === "pendiente") {
    return <Badge tone="amber">{status}</Badge>;
  }

  if (normalizedStatus === "con error") {
    return <Badge tone="red">{status}</Badge>;
  }

  if (normalizedStatus === "duplicado") {
    return <Badge tone="orange">{status}</Badge>;
  }

  if (normalizedStatus === "en progreso") {
    return <Badge tone="blue">{status}</Badge>;
  }

  return <Badge tone="slate">{status}</Badge>;
}
