import { formatCurrency } from '../../calculator'

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

export function CostCard({
  label,
  value,
  accent,
  compact = false,
}: {
  label: string
  value: number
  accent: 'blue' | 'indigo' | 'violet'
  compact?: boolean
}) {
  return (
    <div className={`rounded-xl border ${compact ? 'px-4 py-3' : 'p-5'} ${colors[accent]}`}>
      <p className={`text-slate-600 ${compact ? 'text-xs mb-0.5' : 'text-sm mb-1'}`}>{label}</p>
      <p className={`font-bold ${textColors[accent]} ${compact ? 'text-lg' : 'text-2xl'}`}>
        {formatCurrency(value)}
      </p>
    </div>
  )
}
