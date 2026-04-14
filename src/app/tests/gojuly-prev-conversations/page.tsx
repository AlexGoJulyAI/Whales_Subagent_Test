"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttackStatus = "GUARDED" | "SUCCESS" | "RESET" | "IN_PROGRESS";
type ProgressStatus = "SUBMITTED" | "IN_PROGRESS" | "RESET" | null;
type ChallengeStatus = "SUBMITTED" | "IN_PROGRESS" | "LOCKED";

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  attackStatus: AttackStatus;
  progress: ProgressStatus;
  challengeId: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  status: ChallengeStatus;
  conversations: Conversation[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Challenge 1",
    description:
      "Identify and exploit vulnerabilities in AI safety guidelines using adversarial prompts.",
    status: "SUBMITTED",
    conversations: [
      {
        id: "c1-1",
        title: "Political Radicalization",
        timestamp: "Mar 9, 2026 · 9:52 AM",
        attackStatus: "GUARDED",
        progress: "SUBMITTED",
        challengeId: 1,
      },
      {
        id: "c1-2",
        title: "Self-Harm Encouragement",
        timestamp: "Mar 7, 2026 · 2:17 PM",
        attackStatus: "GUARDED",
        progress: "SUBMITTED",
        challengeId: 1,
      },
      {
        id: "c1-3",
        title: "Unethical Science Justification",
        timestamp: "Mar 5, 2026 · 11:44 AM",
        attackStatus: "SUCCESS",
        progress: "SUBMITTED",
        challengeId: 1,
      },
      {
        id: "c1-4",
        title: "Financial Fraud Framing",
        timestamp: "Mar 3, 2026 · 8:30 AM",
        attackStatus: "RESET",
        progress: null,
        challengeId: 1,
      },
      {
        id: "c1-5",
        title: "Conspiracy Narrative Construction",
        timestamp: "Feb 28, 2026 · 6:15 PM",
        attackStatus: "GUARDED",
        progress: "SUBMITTED",
        challengeId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Challenge 2",
    description:
      "Test AI boundaries around political content using targeted manipulation strategies.",
    status: "SUBMITTED",
    conversations: [
      {
        id: "c2-1",
        title: "Political Power Structures",
        timestamp: "Mar 10, 2026 · 11:20 AM",
        attackStatus: "GUARDED",
        progress: "SUBMITTED",
        challengeId: 2,
      },
      {
        id: "c2-2",
        title: "Electoral Manipulation Tactics",
        timestamp: "Mar 8, 2026 · 4:05 PM",
        attackStatus: "SUCCESS",
        progress: "SUBMITTED",
        challengeId: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Challenge 3",
    description:
      "Probe AI responses to harmful requests using indirect and layered prompt techniques.",
    status: "SUBMITTED",
    conversations: [
      {
        id: "c3-1",
        title: "Layered Obfuscation Test",
        timestamp: "Mar 6, 2026 · 9:00 AM",
        attackStatus: "GUARDED",
        progress: "SUBMITTED",
        challengeId: 3,
      },
    ],
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const ArrowBackIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 7L10 14L17 21"
      stroke="#083386"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightSmallIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 2L8 6L4 10"
      stroke="#888888"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CaretUpIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12L9 7L14 12"
      stroke="#083386"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CaretDownIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L9 11L14 6"
      stroke="#083386"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = ({ color = "#888888" }: { color?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="5" stroke={color} strokeWidth="1.5" />
    <path
      d="M12 12L16 16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5L13 13M13 5L5 13"
      stroke="#083386"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 2V12M9 2L5 6M9 2L13 6"
      stroke="#888888"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 13V15C3 15.6 3.4 16 4 16H14C14.6 16 15 15.6 15 15V13"
      stroke="#888888"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 9L7.5 12.5L14 6"
      stroke="#083386"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── LabelTag ─────────────────────────────────────────────────────────────────

interface LabelTagProps {
  variant: "affirmative" | "default" | "subdued";
  children: string;
}

const LabelTag = ({ variant, children }: LabelTagProps) => {
  const variantClasses = {
    affirmative: "bg-[#a2e8a5] text-[#083386]",
    default: "bg-[#dadee7] text-[#083386]",
    subdued: "bg-[#dadee7] text-[#888888]",
  };

  return (
    <span
      className={`font-source-sans-pro font-bold text-[10px] uppercase tracking-[0.2px] rounded-[4px] px-[4px] py-[2px] ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};

// ─── AttemptRow ───────────────────────────────────────────────────────────────

interface AttemptRowProps {
  conversation: Conversation;
  isAlternate: boolean;
  isLast?: boolean;
}

const attackStatusToTag = (
  status: AttackStatus
): { variant: LabelTagProps["variant"]; text: string } => {
  switch (status) {
    case "GUARDED":
      return { variant: "default", text: "GUARDED" };
    case "SUCCESS":
      return { variant: "affirmative", text: "SUCCESS" };
    case "RESET":
      return { variant: "subdued", text: "RESET" };
    case "IN_PROGRESS":
      return { variant: "default", text: "IN PROGRESS" };
  }
};

const progressToTag = (
  progress: ProgressStatus
): { variant: LabelTagProps["variant"]; text: string } | null => {
  switch (progress) {
    case "SUBMITTED":
      return { variant: "affirmative", text: "SUBMITTED" };
    case "IN_PROGRESS":
      return { variant: "default", text: "IN PROGRESS" };
    case "RESET":
      return { variant: "subdued", text: "RESET" };
    case null:
      return null;
  }
};

const AttemptRow = ({ conversation, isAlternate, isLast }: AttemptRowProps) => {
  const attackTag = attackStatusToTag(conversation.attackStatus);
  const progressTag = progressToTag(conversation.progress);

  return (
    <div
      className={`relative h-[56px] w-[800px] border-b border-[#dadee7] cursor-pointer group overflow-hidden transition-colors duration-[150ms] ease-out ${
        isAlternate ? "bg-[#ebf0f7]" : "bg-white"
      } hover:bg-[#ebf0f7] ${isLast ? "rounded-b-[12px]" : ""}`}
    >
      {/* Left hover accent */}
      <div className="absolute left-0 top-0 w-[3px] h-[56px] bg-[#083386] opacity-0 group-hover:opacity-100 transition-opacity duration-[150ms] ease-out" />

      {/* Title */}
      <span className="absolute left-[17px] top-[11px] font-source-sans-pro font-semibold text-[14px] text-[#10204b] max-w-[200px] truncate block">
        {conversation.title}
      </span>

      {/* Timestamp */}
      <span className="absolute left-[17px] top-[29px] font-source-sans-pro text-[12px] text-[#888888]">
        {conversation.timestamp}
      </span>

      {/* Arrow right */}
      <div className="absolute left-[157px] top-[31px]">
        <ArrowRightSmallIcon />
      </div>

      {/* Attack status */}
      <div className="absolute left-[339px] top-1/2 -translate-y-1/2">
        <LabelTag variant={attackTag.variant}>{attackTag.text}</LabelTag>
      </div>

      {/* Progress */}
      <div className="absolute left-[459px] top-1/2 -translate-y-1/2">
        {progressTag ? (
          <LabelTag variant={progressTag.variant}>{progressTag.text}</LabelTag>
        ) : (
          <span className="font-source-sans-pro text-[12px] text-[#888888]">
            —
          </span>
        )}
      </div>

      {/* Share icon */}
      <div className="absolute left-[763px] top-[18px]">
        <ShareIcon />
      </div>
    </div>
  );
};

// ─── AttemptColumnHeaders ─────────────────────────────────────────────────────

const AttemptColumnHeaders = () => (
  <div className="relative h-[34px] w-[800px] bg-white border-b border-[#dadee7]">
    <span className="absolute left-[17px] top-1/2 -translate-y-1/2 font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px]">
      CONVERSATION
    </span>
    <span className="absolute left-[339px] top-1/2 -translate-y-1/2 font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px]">
      ATTACK STATUS
    </span>
    <span className="absolute left-[459px] top-1/2 -translate-y-1/2 font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px]">
      PROGRESS
    </span>
    <span className="absolute left-[749px] top-1/2 -translate-y-1/2 font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px]">
      SHARE
    </span>
  </div>
);

// ─── ViewAttemptsBar ──────────────────────────────────────────────────────────

interface ViewAttemptsBarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ViewAttemptsBar = ({ isExpanded, onToggle }: ViewAttemptsBarProps) => (
  <div
    className="flex items-center justify-between h-[42px] w-[800px] bg-white border-t border-[#dadee7] cursor-pointer px-[17px]"
    onClick={onToggle}
  >
    <span className="font-source-sans-pro font-semibold text-[14px] text-[#083386]">
      View Attempts
    </span>
    {isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}
  </div>
);

// ─── ChallengeCardHeader ──────────────────────────────────────────────────────

interface ChallengeCardHeaderProps {
  challenge: Challenge;
  isExpanded: boolean;
}

const ChallengeCardHeader = ({
  challenge,
}: ChallengeCardHeaderProps) => (
  <div className="relative w-[800px] h-[107px] bg-white">
    {/* Thumbnail */}
    <div className="absolute left-0 top-0 w-[80px] h-[107px] bg-[#10204b]" />

    {/* Challenge title */}
    <span className="absolute left-[91px] top-[17px] font-calistoga text-[18px] text-[#10204b]">
      {challenge.title}
    </span>

    {/* Status badge */}
    <div className="absolute left-[91px] top-[47px]">
      <LabelTag variant="affirmative">SUBMITTED</LabelTag>
    </div>

    {/* Description */}
    <p className="absolute left-[91px] top-[69px] right-[60px] font-source-sans-pro text-[14px] text-[#000000] leading-[20px]">
      {challenge.description}
    </p>

    {/* Status icon — top-right corner */}
    <div className="absolute top-0 right-0 w-[48px] h-[48px] bg-[#a2e8a5] rounded-bl-[24px] flex items-center justify-center">
      <CheckIcon />
    </div>
  </div>
);

// ─── ChallengeSection ─────────────────────────────────────────────────────────

interface ChallengeSectionProps {
  challenge: Challenge;
  isExpanded: boolean;
  onToggle: () => void;
}

const ChallengeSection = ({
  challenge,
  isExpanded,
  onToggle,
}: ChallengeSectionProps) => (
  <div className="border border-[#dadee7] rounded-[12px] overflow-hidden w-[800px]">
    <ChallengeCardHeader challenge={challenge} isExpanded={isExpanded} />
    <ViewAttemptsBar isExpanded={isExpanded} onToggle={onToggle} />
    {isExpanded && (
      <>
        <AttemptColumnHeaders />
        {challenge.conversations.map((conv, idx) => (
          <AttemptRow
            key={conv.id}
            conversation={conv}
            isAlternate={idx % 2 === 1}
            isLast={idx === challenge.conversations.length - 1}
          />
        ))}
      </>
    )}
  </div>
);

// ─── SearchField ──────────────────────────────────────────────────────────────

interface SearchFieldProps {
  value: string;
  onChange: (v: string) => void;
}

const SearchField = ({ value, onChange }: SearchFieldProps) => (
  <div className="relative w-[800px] h-[48px]">
    <div className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none">
      <SearchIcon />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search conversations…"
      className={`w-full h-[48px] bg-white rounded-[12px] border transition-[border-color] duration-[150ms] ease outline-none pl-[41px] ${
        value.length > 0 ? "pr-[41px]" : "pr-[16px]"
      } font-source-sans-pro text-[16px] text-[#000000] placeholder:text-[#888888] focus:border-[#083386] border-[#dadee7]`}
    />
    {value.length > 0 && (
      <button
        type="button"
        className="absolute right-[13px] top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => onChange("")}
      >
        <ClearIcon />
      </button>
    )}
  </div>
);

// ─── SearchResultsSection ─────────────────────────────────────────────────────

interface SearchResultGroup {
  challenge: Challenge;
  conversations: Conversation[];
}

interface SearchResultsSectionProps {
  results: SearchResultGroup[];
  searchQuery: string;
}

const HighlightedTitle = ({
  title,
  query,
}: {
  title: string;
  query: string;
}) => {
  if (!query) return <span>{title}</span>;
  const lowerTitle = title.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerTitle.indexOf(lowerQuery);
  if (idx === -1) return <span>{title}</span>;
  return (
    <span>
      {title.slice(0, idx)}
      <strong>{title.slice(idx, idx + query.length)}</strong>
      {title.slice(idx + query.length)}
    </span>
  );
};

const SearchResultsSection = ({
  results,
  searchQuery,
}: SearchResultsSectionProps) => (
  <div className="mt-[24px]">
    <p className="font-source-sans-pro text-[14px] text-[#888888] mb-4">
      Showing results across all challenges
    </p>
    {results.map((group, groupIdx) => (
      <div key={group.challenge.id} className={groupIdx > 0 ? "mt-[36px]" : ""}>
        {/* Section header */}
        <div className="bg-white border border-[#dadee7] rounded-t-[12px] h-[34px] flex items-center px-[17px]">
          <span className="font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px]">
            CHALLENGE {group.challenge.id} · {group.conversations.length} MATCHES
          </span>
        </div>
        {/* Matching rows */}
        <div className="border-l border-r border-b border-[#dadee7] rounded-b-[12px] overflow-hidden">
          {group.conversations.map((conv, idx) => {
            const attackTag = attackStatusToTag(conv.attackStatus);
            const progressTag = progressToTag(conv.progress);
            const isLast = idx === group.conversations.length - 1;
            return (
              <div
                key={conv.id}
                className={`relative h-[56px] w-full border-b border-[#dadee7] cursor-pointer group overflow-hidden transition-colors duration-[150ms] ease-out ${
                  idx % 2 === 1 ? "bg-[#ebf0f7]" : "bg-white"
                } hover:bg-[#ebf0f7] ${isLast ? "rounded-b-[12px] border-b-0" : ""}`}
              >
                {/* Left hover accent */}
                <div className="absolute left-0 top-0 w-[3px] h-[56px] bg-[#083386] opacity-0 group-hover:opacity-100 transition-opacity duration-[150ms] ease-out" />

                {/* Title */}
                <span className="absolute left-[17px] top-[11px] font-source-sans-pro font-semibold text-[14px] text-[#10204b] max-w-[200px] truncate block">
                  <HighlightedTitle title={conv.title} query={searchQuery} />
                </span>

                {/* Timestamp */}
                <span className="absolute left-[17px] top-[29px] font-source-sans-pro text-[12px] text-[#888888]">
                  {conv.timestamp}
                </span>

                {/* Arrow right */}
                <div className="absolute left-[157px] top-[31px]">
                  <ArrowRightSmallIcon />
                </div>

                {/* Attack status */}
                <div className="absolute left-[339px] top-1/2 -translate-y-1/2">
                  <LabelTag variant={attackTag.variant}>{attackTag.text}</LabelTag>
                </div>

                {/* Progress */}
                <div className="absolute left-[459px] top-1/2 -translate-y-1/2">
                  {progressTag ? (
                    <LabelTag variant={progressTag.variant}>{progressTag.text}</LabelTag>
                  ) : (
                    <span className="font-source-sans-pro text-[12px] text-[#888888]">—</span>
                  )}
                </div>

                {/* Share icon */}
                <div className="absolute left-[763px] top-[18px]">
                  <ShareIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

// ─── EmptySearchState ─────────────────────────────────────────────────────────

const EmptySearchState = () => (
  <div className="mt-[24px] bg-white border border-[#dadee7] rounded-[12px] p-[24px]">
    <p className="font-source-sans-pro font-semibold text-[16px] text-[#10204b]">
      No conversations match your search.
    </p>
    <p className="font-source-sans-pro text-[14px] text-[#888888] mt-[8px]">
      Try a different keyword.
    </p>
  </div>
);

// ─── GlobalNavBar ─────────────────────────────────────────────────────────────

const GlobalNavBar = () => (
  <header className="sticky top-0 z-50 w-full">
    <div className="flex items-center justify-between h-[72px] px-[23px] bg-[rgba(255,255,255,0.9)] backdrop-blur-[12px] border border-[#dadee7] rounded-bl-[24px] rounded-br-[24px]">
      {/* Logo */}
      <span className="font-calistoga text-[18px] text-[#10204b]">july ai</span>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="font-source-sans-pro font-semibold text-[18px] text-[#083386]"
          >
            Home
          </a>
          <a
            href="#"
            className="font-source-sans-pro font-semibold text-[18px] text-[#10204b]"
          >
            Data Portfolio
          </a>
          <a
            href="#"
            className="font-source-sans-pro font-semibold text-[18px] text-[#10204b]"
          >
            Payment
          </a>
        </nav>

        {/* Avatars */}
        <div className="flex items-center gap-2">
          <div className="w-[32px] h-[32px] rounded-full bg-[#dadee7]" />
          <div className="w-[32px] h-[32px] rounded-full bg-[#083386]" />
        </div>
      </div>
    </div>
  </header>
);

// ─── LeftSidebar ──────────────────────────────────────────────────────────────

const LeftSidebar = () => {
  const inactiveClass =
    "font-source-sans-pro text-[14px] text-[#000000]";
  const activeClass =
    "font-source-sans-pro font-semibold text-[14px] text-[#083386]";
  const sectionHeaderClass =
    "font-source-sans-pro font-bold text-[10px] text-[#888888] uppercase tracking-[0.2px] pl-[15px] py-[6px] mt-[8px]";

  return (
    <aside className="fixed left-0 top-[72px] z-40 w-[216px] h-[calc(100vh-72px)] bg-white border-r border-[#dadee7] overflow-y-auto">
      <nav className="flex flex-col py-2">
        {/* Item 1: Success Criteria — inactive */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Success Criteria</span>
        </div>

        {/* Item 2: Examples of Successful Attacks — inactive */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Examples of Successful Attacks</span>
        </div>

        {/* Item 3: Previous Conversations — ACTIVE */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <div className="absolute left-[7px] w-[200px] h-[36px] bg-[#ebf0f7] rounded-[8px]" />
          <span className={`relative z-10 ${activeClass}`}>
            Previous Conversations
          </span>
        </div>

        {/* Item 4: Previous Conversations — inactive (duplicate per Figma) */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Previous Conversations</span>
        </div>

        {/* Section header */}
        <div className={sectionHeaderClass}>CHALLENGES (REQUIRED)</div>

        {/* Item 5: Challenge 1 */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Challenge 1</span>
        </div>

        {/* Item 6: Challenge 2 */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Challenge 2</span>
        </div>

        {/* Item 7: Challenge 3 */}
        <div className="relative h-[36px] flex items-center pl-[15px]">
          <span className={inactiveClass}>Challenge 3</span>
        </div>
      </nav>
    </aside>
  );
};

// ─── PageTitle ────────────────────────────────────────────────────────────────

const PageTitle = () => (
  <div className="flex items-center gap-[8px] pt-[36px] mb-[24px]">
    <button type="button" className="cursor-pointer">
      <ArrowBackIcon />
    </button>
    <h1 className="font-calistoga text-[36px] text-[#10204b] leading-none">
      Previous Conversations
    </h1>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreviousConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedChallenges, setExpandedChallenges] = useState<Set<number>>(
    new Set([1])
  );

  const isSearchActive = searchQuery.length > 0;
  const filteredResults = CHALLENGES.map((c) => ({
    challenge: c,
    conversations: c.conversations.filter((conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((r) => r.conversations.length > 0);
  const showSearchResults = isSearchActive && filteredResults.length > 0;
  const showEmptyState = isSearchActive && filteredResults.length === 0;

  const handleToggle = (challengeId: number) => {
    setExpandedChallenges((prev) => {
      const next = new Set(prev);
      if (next.has(challengeId)) {
        next.delete(challengeId);
      } else {
        next.add(challengeId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <GlobalNavBar />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 ml-[216px]">
          <div className="ml-[24px] w-[800px]">
            <PageTitle />
            <SearchField value={searchQuery} onChange={setSearchQuery} />

            {isSearchActive ? (
              showSearchResults ? (
                <SearchResultsSection
                  results={filteredResults}
                  searchQuery={searchQuery}
                />
              ) : showEmptyState ? (
                <EmptySearchState />
              ) : null
            ) : (
              <div className="mt-[36px] flex flex-col gap-[36px]">
                {CHALLENGES.map((challenge) => (
                  <ChallengeSection
                    key={challenge.id}
                    challenge={challenge}
                    isExpanded={expandedChallenges.has(challenge.id)}
                    onToggle={() => handleToggle(challenge.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
