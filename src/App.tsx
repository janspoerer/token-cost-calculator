import { useState, useMemo } from 'react'
import { Info, Calculator, BarChart3 } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { calculateCosts, formatCurrency } from './calculator'

export default function App() {
  // Scale
  const [users, setUsers] = useState(100)
  const [usesPerDay, setUsesPerDay] = useState(10)

  // Workflow
  const [inputTokens, setInputTokens] = useState(2000)
  const [outputTokens, setOutputTokens] = useState(500)

  // Pricing (per 1M tokens)
  const [priceInput, setPriceInput] = useState(3.0)
  const [priceCached, setPriceCached] = useState(0)
  const [priceOutput, setPriceOutput] = useState(15.0)

  // Efficiency
  const [cachingEnabled, setCachingEnabled] = useState(true)
  const [cacheHitRate, setCacheHitRate] = useState(100)
  const [agenticLoops, setAgenticLoops] = useState(1)

  // Tooltip
  const [showTooltip, setShowTooltip] = useState(false)

  const costs = useMemo(
    () =>
      calculateCosts({
        users,
        usesPerDay,
        inputTokens,
        outputTokens,
        priceInput,
        priceCached,
        priceOutput,
        cachingEnabled,
        cacheHitRate,
        agenticLoops,
      }),
    [
      users,
      usesPerDay,
      inputTokens,
      outputTokens,
      priceInput,
      priceCached,
      priceOutput,
      cachingEnabled,
      cacheHitRate,
      agenticLoops,
    ],
  )

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
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Calculator className="w-7 h-7 text-blue-600" />
          <h1 className="text-xl font-semibold text-slate-900">
            AI Token Cost Calculator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
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
            <NumberInput
              label="Avg Input Tokens per Use"
              value={inputTokens}
              onChange={setInputTokens}
              min={0}
              step={100}
            />
            <NumberInput
              label="Avg Output Tokens per Use"
              value={outputTokens}
              onChange={setOutputTokens}
              min={0}
              step={100}
            />
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
          </Card>

          {/* Model Pricing */}
          <Card title="Model Pricing (per 1M Tokens)">
            <NumberInput
              label="Base Input Cost ($)"
              value={priceInput}
              onChange={setPriceInput}
              min={0}
              step={0.1}
            />
            <NumberInput
              label="Cached Input Cost ($)"
              value={priceCached}
              onChange={setPriceCached}
              min={0}
              step={0.1}
            />
            <NumberInput
              label="Output Cost ($)"
              value={priceOutput}
              onChange={setPriceOutput}
              min={0}
              step={0.1}
            />
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cachingEnabled}
                  onChange={(e) => setCachingEnabled(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  Context Caching Enabled
                </span>
              </label>
              {cachingEnabled && (
                <div className="relative">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm font-medium text-slate-700">
                      Cache Hit Rate: {cacheHitRate}%
                    </span>
                    <button
                      type="button"
                      className="relative"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onClick={() => setShowTooltip(!showTooltip)}
                    >
                      <Info className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" />
                    </button>
                    {showTooltip && (
                      <div className="absolute left-0 top-6 z-10 w-64 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                        The percentage of input tokens that are successfully
                        read from the cache instead of being processed as new.
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={cacheHitRate}
                    onChange={(e) => setCacheHitRate(+e.target.value)}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column — Dashboard */}
        <div className="lg:col-span-3 space-y-6">
          {/* Cost Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CostCard label="Daily Cost" value={costs.daily} accent="blue" />
            <CostCard
              label="Monthly Cost"
              value={costs.monthly}
              accent="indigo"
            />
            <CostCard
              label="Annual Cost"
              value={costs.annual}
              accent="violet"
            />
          </div>

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
                <Bar
                  dataKey="Uncached Input"
                  stackId="a"
                  fill="#3b82f6"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="Cached Input"
                  stackId="a"
                  fill="#22d3ee"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="Output"
                  stackId="a"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
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
                <Row
                  label="Uncached Input"
                  value={costs.costUncachedInput}
                  color="bg-blue-500"
                />
                <Row
                  label="Cached Input"
                  value={costs.costCachedInput}
                  color="bg-cyan-400"
                />
                <Row
                  label="Output"
                  value={costs.costOutput}
                  color="bg-violet-500"
                />
                <tr className="font-semibold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">
                    {formatCurrency(costs.daily)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {children}
    </div>
  )
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
}) {
  const totalSteps = Math.round((max - min) / step)
  const tickInterval = Math.max(1, Math.ceil(totalSteps / 10))
  const ticks: number[] = []
  for (let i = 0; i <= totalSteps; i += tickInterval) {
    ticks.push(min + i * step)
  }
  if (ticks[ticks.length - 1] !== max) {
    ticks.push(max)
  }

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(+e.target.value || min)}
          className="w-20 text-right bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-sm"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-blue-600"
        list={`ticks-${label.replace(/\s/g, '-')}`}
      />
      <datalist id={`ticks-${label.replace(/\s/g, '-')}`}>
        {ticks.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
      <div className="flex justify-between mt-0.5">
        {ticks.map((t) => (
          <span key={t} className="text-[10px] text-slate-400">
            {Math.round(t)}
          </span>
        ))}
      </div>
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  step: number
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm font-medium text-slate-700 shrink-0">
        {label}
      </label>
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(+e.target.value)}
        className="w-28 text-right bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm"
      />
    </div>
  )
}

function CostCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent: 'blue' | 'indigo' | 'violet'
}) {
  const colors = {
    blue: 'border-blue-200 bg-blue-50',
    indigo: 'border-indigo-200 bg-indigo-50',
    violet: 'border-violet-200 bg-violet-50',
  }
  const textColors = {
    blue: 'text-blue-700',
    indigo: 'text-indigo-700',
    violet: 'text-violet-700',
  }
  return (
    <div className={`rounded-xl border p-5 ${colors[accent]}`}>
      <p className="text-sm text-slate-600 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${textColors[accent]}`}>
        {formatCurrency(value)}
      </p>
    </div>
  )
}

function Row({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <tr>
      <td className="py-2 flex items-center gap-2">
        <span className={`inline-block w-3 h-3 rounded-sm ${color}`} />
        {label}
      </td>
      <td className="py-2 text-right">{formatCurrency(value)}</td>
    </tr>
  )
}
