import { formatCurrency } from '../../calculator'

export function BreakdownRow({
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
