export function TechnicalVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[30rem]"
    >
      <div className="border-accent-blue/20 motion-orbit-slow absolute inset-6 rounded-full border">
        <span className="bg-accent-cyan absolute top-10 left-2 size-1.5 rounded-full shadow-[0_0_14px_var(--accent-cyan)]" />
      </div>
      <div className="border-accent-violet/20 motion-orbit-slower absolute inset-16 rounded-full border">
        <span className="bg-accent-violet absolute top-2 right-16 size-1.5 rounded-full shadow-[0_0_14px_var(--accent-violet)]" />
      </div>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgb(67_217_255_/_0.11),transparent_58%)]" />

      <svg
        className="text-border-strong absolute inset-0 size-full"
        fill="none"
        viewBox="0 0 420 420"
      >
        <path
          d="M92 210H164M256 210H328M210 92V164M210 256V328M138 138L169 169M282 138L251 169M138 282L169 251M282 282L251 251"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1"
        />
        <path
          d="M80 210C126 124 294 124 340 210C294 296 126 296 80 210Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M210 80C296 126 296 294 210 340C124 294 124 126 210 80Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="surface-subtle absolute top-1/2 left-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl shadow-[0_0_44px_rgb(67_217_255_/_0.08)]">
        <div className="text-center">
          <p className="text-foreground font-mono text-2xl font-semibold">
            {"</>"}
          </p>
          <p className="type-mono text-muted-foreground mt-2">SYSTEM CORE</p>
        </div>
      </div>

      {[
        ["API", "top-8 left-1/2 -translate-x-1/2"],
        ["ML", "top-1/2 right-5 -translate-y-1/2"],
        ["DB", "bottom-8 left-1/2 -translate-x-1/2"],
        ["EVT", "top-1/2 left-5 -translate-y-1/2"],
      ].map(([label, position]) => (
        <div
          className={`absolute ${position} border-border-strong bg-surface/80 text-muted-foreground grid size-14 place-items-center rounded-full border font-mono text-xs font-medium shadow-[0_0_28px_rgb(67_217_255_/_0.06)]`}
          key={label}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
