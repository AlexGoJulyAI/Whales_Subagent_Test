'use client';

export function PromoBanner() {
  return (
    <div
      style={{ backgroundColor: "rgb(19, 19, 105)" }}
      className="w-full flex justify-center items-center px-5"
      role="banner"
    >
      <div className="flex flex-col sm:flex-row justify-center items-center gap-y-1 py-2 sm:py-0 sm:h-[54px] text-center sm:text-left">
        <span
          className="text-white text-sm font-bold leading-none"
          style={{ fontSize: "14px", fontWeight: 700 }}
        >
          Special Prime Offer
        </span>
        <span
          className="hidden sm:inline text-white mx-1 select-none"
          style={{ fontSize: "14px" }}
          aria-hidden="true"
        >
          {" | "}
        </span>
        <span
          className="text-white"
          style={{ fontSize: "14px" }}
        >
          2 months free with your first Audible trial
        </span>
        <a
          href="#"
          className="transition-colors duration-150"
          style={{
            backgroundColor: "rgb(255, 160, 0)",
            color: "rgb(1, 14, 25)",
            borderRadius: "32px",
            paddingLeft: "14px",
            paddingRight: "14px",
            paddingTop: "6px",
            paddingBottom: "6px",
            fontSize: "14px",
            fontWeight: 700,
            marginLeft: "16px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "rgb(220, 136, 0)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "rgb(255, 160, 0)";
          }}
        >
          Get this deal
        </a>
      </div>
    </div>
  );
}
