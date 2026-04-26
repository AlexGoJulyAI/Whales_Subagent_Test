'use client';

import Image from "next/image";
import { AudiobookItem as AudiobookItemProps } from "@/types/audiobook";

// Inline StarRating — used if src/components/StarRating.tsx does not yet exist.
// When StarRating.tsx is available in the same branch, replace this import with:
//   import { StarRating } from "./StarRating";
interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center" style={{ marginTop: "4px", marginBottom: "4px", gap: "2px" }}>
      <span style={{ fontSize: "14px", color: "rgb(1, 14, 25)", marginRight: "2px" }}>
        {rating}
      </span>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} style={{ color: "rgb(255, 160, 0)", fontSize: "14px" }}>★</span>
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} style={{ color: "rgb(209, 214, 215)", fontSize: "14px" }}>★</span>
      ))}
      <span style={{ fontSize: "14px", color: "rgb(14, 91, 155)", marginLeft: "4px" }}>
        {reviewCount.toLocaleString()} ratings
      </span>
    </div>
  );
}

export function AudiobookItem({
  coverUrl,
  coverAlt,
  bookUrl,
  title,
  subtitle,
  authorName,
  authorUrl,
  narratorNames,
  narratorUrls,
  length,
  releaseDate,
  language,
  rating,
  reviewCount,
  description,
  price,
  buyUrl,
}: AudiobookItemProps) {
  return (
    <li style={{ listStyle: "none", width: "100%", padding: 0, margin: 0 }}>
      {/* 3-column flex row */}
      <div
        className="flex flex-col sm:flex-row items-start"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {/* ── Left column: cover image + preview link ── */}
        <div
          className="flex-shrink-0 w-full sm:w-auto"
          style={{ width: "232px", minWidth: "232px", paddingRight: "24px" }}
        >
          <a href={bookUrl} tabIndex={-1} style={{ display: "block" }}>
            <Image
              src={coverUrl}
              alt={coverAlt}
              width={232}
              height={232}
              unoptimized
              style={{
                width: "232px",
                height: "232px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </a>
          <a
            href={bookUrl}
            className="flex items-center"
            style={{
              gap: "4px",
              fontSize: "14px",
              color: "rgb(1, 14, 25)",
              textDecoration: "none",
              marginTop: "8px",
              cursor: "pointer",
            }}
          >
            ▶ Preview
          </a>
        </div>

        {/* ── Center column: metadata ── */}
        <div
          className="flex-1 min-w-0"
          style={{ paddingRight: "24px" }}
        >
          {/* Title */}
          <h3 style={{ margin: 0, lineHeight: "24px" }}>
            <a
              href={bookUrl}
              className="hover:underline"
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "rgb(14, 91, 155)",
                textDecoration: "none",
                lineHeight: "24px",
              }}
            >
              {title}
            </a>
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "4px 0" }}>
              {subtitle}
            </p>
          )}

          {/* By: Author */}
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "2px 0" }}>
            By:{" "}
            <a
              href={authorUrl}
              className="hover:underline"
              style={{ color: "rgb(14, 91, 155)", textDecoration: "none" }}
            >
              {authorName}
            </a>
          </p>

          {/* Narrated by: Narrators */}
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "2px 0" }}>
            Narrated by:{" "}
            {narratorNames.map((name, i) => (
              <span key={i}>
                <a
                  href={narratorUrls[i] ?? "#"}
                  className="hover:underline"
                  style={{ color: "rgb(14, 91, 155)", textDecoration: "none" }}
                >
                  {name}
                </a>
                {i < narratorNames.length - 1 && ", "}
              </span>
            ))}
          </p>

          {/* Length */}
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "2px 0" }}>
            Length: {length}
          </p>

          {/* Release date */}
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "2px 0" }}>
            Release date: {releaseDate}
          </p>

          {/* Language */}
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", margin: "2px 0" }}>
            Language: {language}
          </p>

          {/* Star rating */}
          <StarRating rating={rating} reviewCount={reviewCount} />

          {/* Description */}
          <p
            className="line-clamp-3 overflow-hidden"
            style={{
              fontSize: "14px",
              color: "rgb(1, 14, 25)",
              marginTop: "8px",
              lineHeight: "20px",
            }}
          >
            {description}
          </p>
        </div>

        {/* ── Right column: price + CTA ── */}
        <div
          className="flex-shrink-0 w-full sm:w-auto"
          style={{ width: "232px", minWidth: "232px", paddingTop: "4px" }}
        >
          <p style={{ fontSize: "14px", color: "rgb(1, 14, 25)", marginBottom: "10px" }}>
            {price}
          </p>
          <a
            href={buyUrl}
            className="flex items-center justify-center hover:no-underline"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "232px",
              height: "28px",
              backgroundColor: "rgb(255, 160, 0)",
              color: "rgb(1, 14, 25)",
              borderRadius: "32px",
              fontSize: "14px",
              fontWeight: 400,
              textDecoration: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgb(220, 136, 0)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgb(255, 160, 0)";
            }}
          >
            Try Standard free
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(1, 14, 25, 0.15)" }} />
    </li>
  );
}
