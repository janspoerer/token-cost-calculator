import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BarChart3 } from 'lucide-react'
import { formatCurrency, type CalculatorResult } from '../calculator'
import { Card } from './ui/Card'
import { SliderInput } from './ui/SliderInput'
import { NumberInput } from './ui/NumberInput'
import { BreakdownRow } from './ui/BreakdownRow'
import { ReasoningToggle } from './ReasoningToggle'
import { TokenEstimator } from './TokenEstimator'

export function MainContent({
  users,
  setUsers,
  usesPerDay,
  setUsesPerDay,
  inputTokens,
  setInputTokens,
  outputTokens,
  setOutputTokens,
  agenticLoops,
  setAgenticLoops,
  priceInput,
  setPriceInput,
  priceCached,
  setPriceCached,
  priceOutput,
  setPriceOutput,
  isCustomModel,
  reasoningEnabled,
  setReasoningEnabled,
  reasoningMultiplier,
  setReasoningMultiplier,
  costs,
}: {
  users: number
  setUsers: (v: number) => void
  usesPerDay: number
  setUsesPerDay: (v: number) => void
  inputTokens: number
  setInputTokens: (v: number) => void
  outputTokens: number
  setOutputTokens: (v: number) => void
  agenticLoops: number
  setAgenticLoops: (v: number) => void
  priceInput: number
  setPriceInput: (v: number) => void
  priceCached: number
  setPriceCached: (v: number) => void
  priceOutput: number
  setPriceOutput: (v: number) => void
  isCustomModel: boolean
  reasoningEnabled: boolean
  setReasoningEnabled: (v: boolean) => void
  reasoningMultiplier: number
  setReasoningMultiplier: (v: number) => void
  costs: CalculatorResult
}) {
  const chartData = [
    {
      name: 'Daily',
      'Uncached Input': +costs.costUncachedInput.toFixed(2),
      'Cached Input': +costs.costCachedInput.toFixed(2),
      Output: +costs.costOutput.toFixed(2),
    },
    {
      name: 'Monthly',
      'Uncached Input': +(costs.costUncachedInput * 30).toFixed(2),
      'Cached Input': +(costs.costCachedInput * 30).toFixed(2),
      Output: +(costs.costOutput * 30).toFixed(2),
    },
    {
      name: 'Annual',
      'Uncached Input': +(costs.costUncachedInput * 365).toFixed(2),
      'Cached Input': +(costs.costCachedInput * 365).toFixed(2),
      Output: +(costs.costOutput * 365).toFixed(2),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Column — Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Scale */}
        <Card title="Scale">
          <SliderInput
            label="Number of Users"
            value={users}
            onChange={setUsers}
            min={1}
            max={100}
            step={1}
          />
          <SliderInput
            label="Uses per User per Day"
            value={usesPerDay}
            onChange={setUsesPerDay}
            min={1}
            max={10}
            step={1}
          />
        </Card>

        {/* Workflow */}
        <Card title="Workflow">
          <div className="space-y-1">
            <NumberInput
              label="Avg Input Tokens per Use"
              value={inputTokens}
              onChange={setInputTokens}
              min={0}
              step={100}
            />
            <TokenEstimator onApply={setInputTokens} />
          </div>
          <div className="space-y-1">
            <NumberInput
              label="Avg Output Tokens per Use"
              value={outputTokens}
              onChange={setOutputTokens}
              min={0}
              step={100}
            />
            <TokenEstimator onApply={setOutputTokens} />
          </div>
          <div className="pt-2 border-t border-slate-100">
            <SliderInput
              label="Agentic Multi-Turn Loops"
              value={agenticLoops}
              onChange={setAgenticLoops}
              min={1}
              max={10}
              step={1}
            />
          </div>
          <div className="pt-2 border-t border-slate-100">
            <ReasoningToggle
              enabled={reasoningEnabled}
              onToggle={setReasoningEnabled}
              multiplier={reasoningMultiplier}
              onMultiplierChange={setReasoningMultiplier}
            />
          </div>
        </Card>

        {/* Model Pricing */}
        <Card title="Model Pricing (per 1M Tokens)">
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
              Prices are set by the selected model. Choose "Custom" to edit manually.
            </p>
          )}
        </Card>
      </div>

      {/* Right Column — Dashboard */}
      <div className="lg:col-span-3 space-y-6">
        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Cost Breakdown
            </h2>
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
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Daily Breakdown
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              <BreakdownRow label="Uncached Input" value={costs.costUncachedInput} color="bg-blue-500" />
              <BreakdownRow label="Cached Input" value={costs.costCachedInput} color="bg-cyan-400" />
              <BreakdownRow label="Output" value={costs.costOutput} color="bg-violet-500" />
              <tr className="font-semibold">
                <td className="py-2">Total</td>
                <td className="py-2 text-right">{formatCurrency(costs.daily)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
