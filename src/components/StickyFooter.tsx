import { type CalculatorResult, formatCurrency } from '../calculator'

export function StickyFooter({ costs }: { costs: CalculatorResult }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        <FooterItem label="Daily Cost" value={costs.daily} accent="blue" />
        <FooterItem label="Monthly Cost" value={costs.monthly} accent="indigo" />
        <FooterItem label="Annual Cost" value={costs.annual} accent="violet" />
      </div>
    </footer>
  )
}

function FooterItem({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent: 'blue' | 'indigo' | 'violet'
}) {
  const bg = {
    blue: 'bg-blue-50 border-blue-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    violet: 'bg-violet-50 border-violet-200',
  }
  const text = {
    blue: 'text-blue-700',
    indigo: 'text-indigo-700',
    violet: 'text-violet-700',
  }
  return (
    <div className={`rounded-lg border px-4 py-2 ${bg[accent]}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-xl font-bold ${text[accent]}`}>
        {formatCurrency(value)}
      </p>
    </div>
  )
}
