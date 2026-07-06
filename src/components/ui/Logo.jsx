import { useId } from 'react'

/**
 * The </> code-bracket mark from the GVO logo, drawn as pure SVG paths
 * with a brushed-chrome gradient so it stays crisp at any size.
 */
export function CodeMark({ className = 'h-6 w-auto' }) {
  const id = useId()
  const gradId = `chrome-${id.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg viewBox="0 0 96 44" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8f8f8" />
          <stop offset="0.45" stopColor="#b0b0b0" />
          <stop offset="0.52" stopColor="#5f5f5f" />
          <stop offset="0.6" stopColor="#dedede" />
          <stop offset="1" stopColor="#8a8a8a" />
        </linearGradient>
      </defs>
      {/* < */}
      <path
        d="M28 4 8 22l20 18"
        stroke={`url(#${gradId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* / */}
      <path
        d="M56 4 40 40"
        stroke={`url(#${gradId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* > */}
      <path
        d="M68 4l20 18-20 18"
        stroke={`url(#${gradId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Compact horizontal logo lockup for the nav / footer:
 * </> icon badge + chrome "GVO" wordmark.
 * Recreates the static logo (see /public/images/logo/gvo-logo.png).
 */
export default function Logo({ compact = false }) {
  return (
    <span className="group flex items-center gap-3" aria-label="GVO Web Design home">
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-ink-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <CodeMark className="h-4 w-auto" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-chrome font-logo text-xl tracking-wide">GVO</span>
        {!compact && (
          <span className="mt-1 font-display text-[9px] font-semibold uppercase tracking-[0.34em] text-silver-500">
            Web Design
          </span>
        )}
      </span>
    </span>
  )
}
