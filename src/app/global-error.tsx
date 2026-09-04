"use client";

import { useEffect } from "react";

// global-error replaces the root layout, so it is intentionally self-contained
// with inline styles — it must render even if the app shell itself failed.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d13",
          color: "#f4f7fb",
          fontFamily: "system-ui, -apple-system, Segoe UI, Arial, sans-serif",
        }}
      >
        <main
          style={{ maxWidth: "34rem", padding: "2rem", textAlign: "center" }}
        >
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>
            Something went wrong.
          </h1>
          <p
            style={{ color: "#9aa7ba", lineHeight: 1.6, margin: "0 0 1.5rem" }}
          >
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              border: "1px solid #43d9ff",
              background: "transparent",
              color: "#f4f7fb",
              padding: "0.55rem 1.1rem",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
