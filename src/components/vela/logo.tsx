export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M18 38c2-14 14-22 24-16 6 3 8 11 5 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M46 26c-2 14-14 22-24 16-6-3-8-11-5-18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="16" cy="20" r="2.1" fill="currentColor" />
      <circle cx="50" cy="18" r="1.5" fill="currentColor" />
      <circle cx="48" cy="48" r="1.8" fill="currentColor" />
    </svg>
  );
}
