'use client';

import Image from "next/image";
import { Globe, Play, Search } from "lucide-react";

export function NavHeader() {
  return (
    <header
      style={{ backgroundColor: "rgb(255, 255, 255)" }}
      className="w-full"
    >
      {/* Top row */}
      <div
        className="flex justify-between items-center"
        style={{ height: "54px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        {/* Logo */}
        <a href="#" aria-label="Audible home">
          <Image
            src="/seo/audible-logo.png"
            alt="audible, an amazon company"
            width={140}
            height={54}
            style={{ objectFit: "contain", display: "block" }}
            priority
          />
        </a>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Help link */}
          <a
            href="#"
            style={{
              fontSize: "16px",
              color: "rgb(1, 14, 25)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                "underline";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                "none";
            }}
          >
            Help
          </a>

          {/* Language / currency */}
          <button
            type="button"
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            style={{ fontSize: "16px", color: "rgb(1, 14, 25)" }}
            aria-label="Change language or currency"
          >
            <Globe size={16} aria-hidden="true" />
            <span>English – USD</span>
          </button>

          {/* Sign in button */}
          <a
            href="#"
            className="flex items-center"
            style={{
              backgroundColor: "rgb(255, 160, 0)",
              color: "rgb(1, 14, 25)",
              fontWeight: 700,
              fontSize: "16px",
              borderRadius: "9999px",
              paddingLeft: "16px",
              paddingRight: "16px",
              height: "42px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Sign in
          </a>
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="flex justify-between items-center"
        style={{ height: "82px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        {/* Browse */}
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
          style={{ color: "rgb(1, 14, 25)" }}
          aria-label="Browse categories"
        >
          <Play size={16} aria-hidden="true" />
          <span style={{ fontSize: "16px", fontWeight: 600 }}>Browse</span>
        </button>

        {/* Search bar */}
        <div
          className="flex overflow-hidden"
          style={{
            width: "480px",
            height: "42px",
            border: "1px solid rgb(209, 214, 215)",
            borderRadius: "4px",
          }}
        >
          <input
            type="text"
            placeholder="Find your next great listen"
            className="flex-1 border-none outline-none bg-transparent"
            style={{
              fontSize: "14px",
              paddingLeft: "12px",
              color: "rgb(1, 14, 25)",
            }}
            aria-label="Search Audible"
          />
          <button
            type="submit"
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: "rgb(255, 160, 0)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Search"
          >
            <Search size={18} color="rgb(1, 14, 25)" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
