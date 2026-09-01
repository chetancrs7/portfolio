import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  align?: "left" | "center";
  className?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  align = "left",
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="type-eyebrow text-accent-cyan">{eyebrow}</p>
      <h2 className="type-h2 mt-4 text-balance">{title}</h2>
      {description ? (
        <p className="type-body-lg text-muted-foreground mt-5">{description}</p>
      ) : null}
    </div>
  );
}
