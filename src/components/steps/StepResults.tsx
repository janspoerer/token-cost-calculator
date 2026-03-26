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
import { formatCurrency, type CalculatorResult } from '../../calculator'
import { BreakdownRow } from '../ui/BreakdownRow'

export function StepResults({ costs }: { costs: CalculatorResult }) {
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
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Your Results</h2>
        <p className="text-sm text-slate-500">
          Cost breakdown based on your configuration.
        </p>
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
    </div>
  )
}
