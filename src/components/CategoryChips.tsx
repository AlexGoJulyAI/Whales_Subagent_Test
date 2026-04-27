'use client';

import type { CategoryChip } from "@/types/audiobook";

const chips: CategoryChip[] = [
  { label: "Biographical Fiction", href: "#" },
  { label: "Women", href: "#" },
  { label: "Artists, Architects & Photographers", href: "#" },
  { label: "Memoirs, Diaries & Correspondence", href: "#" },
  { label: "Collections & Anthologies", href: "#" },
  { label: "Musician", href: "#" },
  { label: "Writing & Publishing", href: "#" },
  { label: "Biographies", href: "#" },
  { label: "Literary Fiction", href: "#" },
];

export function CategoryChips() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        paddingTop: 8,
        paddingBottom: 24,
        maxWidth: 900,
        margin: "0 auto",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {chips.map((chip) => (
        <a
          key={chip.label}
          href={chip.href}
          className="chip-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 42,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(209, 214, 215)",
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 700,
            color: "rgb(1, 14, 25)",
            cursor: "pointer",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "border-color 0.1s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgb(1, 14, 25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgb(209, 214, 215)";
          }}
        >
          {chip.label}
        </a>
      ))}
    </div>
  );
}
