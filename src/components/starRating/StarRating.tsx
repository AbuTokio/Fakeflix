export type StarRatingProps = {
  value: number
  max?: number
  size?: number
  showNumber?: boolean
  className?: string
}

export default function StarRating({
  value,
  max = 10,
  size = 18,
  showNumber = false,
  className = "",
}: StarRatingProps) {
  const v = Math.max(0, Math.min(value, max))
  const pct = (v / max) * 100

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: size * max, height: size }}>
        <div className="absolute inset-0 text-neutral-600">
          <StarsRow count={max} size={size} />
        </div>
        <div className="absolute inset-y-0 left-0 overflow-hidden text-yellow-400" style={{ width: `${pct}%` }}>
          <StarsRow count={max} size={size} />
        </div>
      </div>

      {showNumber && <span className="text-sm text-yellow-300 tabular-nums">{v.toFixed(1)}</span>}
    </div>
  )
}

function StarsRow({ count, size }: { count: number; size: number }) {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} />
      ))}
    </div>
  )
}

function Star({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0" aria-hidden="true" focusable="false">
      <path
        d="M12 2l2.937 6.07 6.7.974-4.818 4.695 1.137 6.632L12 17.77 6.044 20.37l1.137-6.632L2.363 9.044l6.7-.974L12 2z"
        fill="currentColor"
      />
    </svg>
  )
}
