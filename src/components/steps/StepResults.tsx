import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BarChart3, SlidersHorizontal, X } from 'lucide-react'
import { formatCurrency, type CalculatorResult } from '../../calculator'
import { BreakdownRow } from '../ui/BreakdownRow'
import { ModelSelector } from '../ModelSelector'
import { NumberInput } from '../ui/NumberInput'
import { SliderInput } from '../ui/SliderInput'
import { ReasoningToggle } from '../ReasoningToggle'
import type { CalculatorState } from '../../hooks/useCalculatorState'

type StepResultsProps = {
  costs: CalculatorResult
  state: CalculatorState
}

export function StepResults({ costs, state }: StepResultsProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const chartData = [
    {
      name: 'Monthly',
      'Uncached Input': +(costs.costUncachedInput * 30).toFixed(2),
      'Cached Input': +(costs.costCachedInput * 30).toFixed(2),
      Output: +(costs.costOutput * 30).toFixed(2),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Your Results</h2>
          <p className="text-sm text-slate-500">
            Cost breakdown based on your configuration.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Adjust Inputs
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            Cost Breakdown
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis
              tickFormatter={(v: number) => formatCurrency(v)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => `$${Number(value).toFixed(2)}`}
            />
            <Legend
              content={() => (
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  {[
                    { label: 'Uncached Input', color: '#3b82f6' },
                    { label: 'Cached Input', color: '#22d3ee' },
                    { label: 'Output', color: '#8b5cf6' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Bar dataKey="Uncached Input" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Cached Input" stackId="a" fill="#22d3ee" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Output" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Monthly Breakdown
        </h3>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-slate-100">
            <BreakdownRow label="Uncached Input" value={costs.costUncachedInput * 30} color="bg-blue-500" />
            <BreakdownRow label="Cached Input" value={costs.costCachedInput * 30} color="bg-cyan-400" />
            <BreakdownRow label="Output" value={costs.costOutput * 30} color="bg-violet-500" />
            <tr className="font-semibold">
              <td className="py-2">Total</td>
              <td className="py-2 text-right">{formatCurrency(costs.monthly)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="relative w-full max-w-sm bg-white shadow-xl flex flex-col animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Adjust Inputs
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              {/* Model */}
              <section className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Model
                </h4>
                <ModelSelector
                  value={state.selectedModel}
                  onChange={state.setSelectedModel}
                />
              </section>

              {/* Scale */}
              <section className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Scale
                </h4>
                <SliderInput
                  label="Number of Users"
                  value={state.users}
                  onChange={state.setUsers}
                  min={1}
                  max={100}
                  step={1}
                />
                <SliderInput
                  label="Uses per User per Day"
                  value={state.usesPerDay}
                  onChange={state.setUsesPerDay}
                  min={1}
                  max={10}
                  step={1}
                />
              </section>

              {/* Workflow */}
              <section className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Workflow
                </h4>
                <NumberInput
                  label="Avg Input Tokens"
                  value={state.inputTokens}
                  onChange={state.setInputTokens}
                  min={0}
                  step={100}
                />
                <NumberInput
                  label="Avg Output Tokens"
                  value={state.outputTokens}
                  onChange={state.setOutputTokens}
                  min={0}
                  step={100}
                />
                <SliderInput
                  label="Agentic Loops"
                  value={state.agenticLoops}
                  onChange={state.setAgenticLoops}
                  min={1}
                  max={10}
                  step={1}
                />
              </section>

              {/* Caching */}
              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Caching
                </h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.cachingEnabled}
                    onChange={(e) => state.setCachingEnabled(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Enable Caching
                  </span>
                </label>
                {state.cachingEnabled && (
                  <div className="space-y-1">
                    <span className="text-sm text-slate-600">
                      Cache Hit Rate: {state.cacheHitRate}%
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={state.cacheHitRate}
                      onChange={(e) => state.setCacheHitRate(+e.target.value)}
                      className="w-full accent-blue-600"
                    />
                  </div>
                )}
              </section>

              {/* Reasoning */}
              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Reasoning
                </h4>
                <ReasoningToggle
                  enabled={state.reasoningEnabled}
                  onToggle={state.setReasoningEnabled}
                  multiplier={state.reasoningMultiplier}
                  onMultiplierChange={state.setReasoningMultiplier}
                />
              </section>

              {/* Pricing (read-only unless custom) */}
              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Pricing (per 1M Tokens)
                </h4>
                <NumberInput
                  label="Input ($)"
                  value={state.priceInput}
                  onChange={state.setPriceInput}
                  min={0}
                  step={0.1}
                  readOnly={!state.isCustomModel}
                />
                <NumberInput
                  label="Cached ($)"
                  value={state.priceCached}
                  onChange={state.setPriceCached}
                  min={0}
                  step={0.1}
                  readOnly={!state.isCustomModel}
                />
                <NumberInput
                  label="Output ($)"
                  value={state.priceOutput}
                  onChange={state.setPriceOutput}
                  min={0}
                  step={0.1}
                  readOnly={!state.isCustomModel}
                />
                {!state.isCustomModel && (
                  <p className="text-xs text-slate-400">
                    Choose "Custom" model to edit pricing.
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
