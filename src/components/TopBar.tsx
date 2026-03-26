import { Calculator } from 'lucide-react'
import { ShareButton } from './ShareButton'

const STEP_LABELS = ['Model', 'Scale', 'Workflow', 'Results']

export function TopBar({
  exportURL,
  step,
  onStepClick,
}: {
  exportURL: () => string
  step: number
  onStepClick: (step: number) => void
}) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-20">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Row 1: Title + Share */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-slate-900">
              AI Token Cost Calculator
            </h1>
          </div>
          <ShareButton exportURL={exportURL} />
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1">
          {STEP_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => onStepClick(i)}
              className="flex-1 group"
            >
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= step ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
              <span
                className={`block text-xs mt-1 transition-colors ${
                  i === step
                    ? 'text-blue-600 font-semibold'
                    : i < step
                      ? 'text-slate-500'
                      : 'text-slate-400'
                }`}
              >
                {i + 1}. {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
