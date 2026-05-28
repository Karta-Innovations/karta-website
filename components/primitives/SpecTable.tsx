import { cn } from "@/lib/cn";

export interface SpecRow {
  label: string;
  value: string;
  unit?: string;
}

interface SpecTableProps {
  rows: SpecRow[];
  className?: string;
  variant?: "dark" | "ghost";
}

export function SpecTable({ rows, className, variant = "dark" }: SpecTableProps) {
  return (
    <dl
      className={cn(
        "w-full text-sm",
        variant === "dark" && "divide-y divide-border",
        variant === "ghost" && "divide-y divide-border-soft",
        className,
      )}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-3"
        >
          <dt className="font-mono text-[11px] tracking-[0.22em] uppercase text-fg-tertiary">
            {row.label}
          </dt>
          <dd className="font-mono text-[13px] tracking-[0.04em] text-fg">
            {row.value}
            {row.unit ? (
              <span className="ml-1 text-fg-tertiary">{row.unit}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
