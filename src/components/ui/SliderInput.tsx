export function SliderInput({
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
