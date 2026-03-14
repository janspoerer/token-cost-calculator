export function NumberInput({
  label,
  value,
  onChange,
  min,
  step,
  readOnly = false,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  step: number
  readOnly?: boolean
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
        readOnly={readOnly}
        className={`w-28 text-right border rounded px-3 py-1.5 text-sm ${
          readOnly
            ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-default'
            : 'bg-slate-50 border-slate-200'
        }`}
      />
    </div>
  )
}
