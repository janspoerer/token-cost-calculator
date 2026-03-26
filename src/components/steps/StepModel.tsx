import { useState } from 'react'
import { Info } from 'lucide-react'
import { ModelSelector } from '../ModelSelector'
import { NumberInput } from '../ui/NumberInput'

export function StepModel({
  selectedModel,
  onModelChange,
  cachingEnabled,
  onCachingChange,
  cacheHitRate,
  onCacheHitRateChange,
  priceInput,
  setPriceInput,
  priceCached,
  setPriceCached,
  priceOutput,
  setPriceOutput,
  isCustomModel,
}: {
  selectedModel: string
  onModelChange: (model: string) => void
  cachingEnabled: boolean
  onCachingChange: (v: boolean) => void
  cacheHitRate: number
  onCacheHitRateChange: (v: number) => void
  priceInput: number
  setPriceInput: (v: number) => void
  priceCached: number
  setPriceCached: (v: number) => void
  priceOutput: number
  setPriceOutput: (v: number) => void
  isCustomModel: boolean
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Choose a Model</h2>
        <p className="text-sm text-slate-500">
          Select an AI model or enter custom pricing.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
        {/* Model selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Model
          </label>
          <ModelSelector value={selectedModel} onChange={onModelChange} />
        </div>

        {/* Caching */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cachingEnabled}
              onChange={(e) => onCachingChange(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-slate-700">
              Enable Caching
            </span>
          </label>

          {cachingEnabled && (
            <div className="flex items-center gap-3 relative">
              <span className="text-sm text-slate-600 whitespace-nowrap">
                Cache Hit Rate: {cacheHitRate}%
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
                className="flex-1 accent-blue-600"
              />
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">
            Pricing (per 1M Tokens)
          </h3>
          <NumberInput
            label="Base Input Cost ($)"
            value={priceInput}
            onChange={setPriceInput}
            min={0}
            step={0.1}
            readOnly={!isCustomModel}
          />
          <NumberInput
            label="Cached Input Cost ($)"
            value={priceCached}
            onChange={setPriceCached}
            min={0}
            step={0.1}
            readOnly={!isCustomModel}
          />
          <NumberInput
            label="Output Cost ($)"
            value={priceOutput}
            onChange={setPriceOutput}
            min={0}
            step={0.1}
            readOnly={!isCustomModel}
          />
          {!isCustomModel && (
            <p className="text-xs text-slate-400">
              Prices are set by the selected model. Choose "Custom" to edit
              manually.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
