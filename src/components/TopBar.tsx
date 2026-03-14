import { Calculator, Info } from 'lucide-react'
import { useState } from 'react'
import { ModelSelector } from './ModelSelector'
import { ShareButton } from './ShareButton'

export function TopBar({
  selectedModel,
  onModelChange,
  cachingEnabled,
  onCachingChange,
  cacheHitRate,
  onCacheHitRateChange,
  exportURL,
}: {
  selectedModel: string
  onModelChange: (model: string) => void
  cachingEnabled: boolean
  onCachingChange: (v: boolean) => void
  cacheHitRate: number
  onCacheHitRateChange: (v: number) => void
  exportURL: () => string
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto space-y-3">
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

        {/* Row 2: Model + Caching */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Model:</span>
            <ModelSelector value={selectedModel} onChange={onModelChange} />
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cachingEnabled}
              onChange={(e) => onCachingChange(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-slate-600">Caching</span>
          </label>

          {cachingEnabled && (
            <div className="flex items-center gap-2 relative">
              <span className="text-sm text-slate-600">
                Hit Rate: {cacheHitRate}%
              </span>
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <Info className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" />
              </button>
              {showTooltip && (
                <div className="absolute left-0 top-7 z-30 w-64 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                  The percentage of input tokens that are successfully read from
                  the cache instead of being processed as new.
                </div>
              )}
              <input
                type="range"
                min={0}
                max={100}
                value={cacheHitRate}
                onChange={(e) => onCacheHitRateChange(+e.target.value)}
                className="w-32 accent-blue-600"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
