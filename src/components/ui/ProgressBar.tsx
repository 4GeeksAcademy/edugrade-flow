type ProgressBarProps = {
  value: number;
  variant?: "Completo" | "En progreso" | "Pendiente" | "Con error" | "Duplicado";
};

const variantStyles: Record<NonNullable<ProgressBarProps["variant"]>, string> = {
  Completo: "bg-green-600",
  "En progreso": "bg-blue-700",
  Pendiente: "bg-amber-600",
  "Con error": "bg-red-600",
  Duplicado: "bg-orange-600",
};

export function ProgressBar({ value, variant = "En progreso" }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200" role="progressbar" aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={`h-full rounded-full transition-all ${variantStyles[variant]}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
