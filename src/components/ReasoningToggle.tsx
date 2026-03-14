import { Brain } from 'lucide-react'

export function ReasoningToggle({
  enabled,
  onToggle,
  multiplier,
  onMultiplierChange,
}: {
  enabled: boolean
  onToggle: (v: boolean) => void
  multiplier: number
  onMultiplierChange: (v: number) => void
}) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4 accent-blue-600"
        />
        <Brain className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          Reasoning / Thinking Tokens
        </span>
      </label>
      {enabled && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">
              Output multiplier: {multiplier.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={3}
            step={0.1}
            value={multiplier}
            onChange={(e) => onMultiplierChange(+e.target.value)}
            className="w-full accent-blue-600"
          />
          <p className="text-xs text-slate-400 mt-1">
            Thinking models use hidden reasoning tokens billed as output.
            This multiplies output tokens to reflect that cost.
          </p>
        </div>
      )}
    </div>
  )
}
