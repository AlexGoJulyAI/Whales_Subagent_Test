interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 >= 0.3;
  const filledCount = fullStars + (hasPartial ? 1 : 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <span
        style={{ fontSize: 14, fontWeight: 700, color: "rgb(1, 14, 25)" }}
      >
        {rating}
      </span>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: 14,
            color:
              i < filledCount ? "rgb(255, 160, 0)" : "rgb(1, 14, 25)",
          }}
        >
          {i < filledCount ? "★" : "☆"}
        </span>
      ))}
      <span
        style={{ fontSize: 14, color: "rgb(1, 14, 25)", marginLeft: 4 }}
      >
        {reviewCount.toLocaleString()} ratings
      </span>
    </div>
  );
}
