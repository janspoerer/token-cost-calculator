import { MODEL_PRESETS } from '../data/models'

export function ModelSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (model: string) => void
}) {
  const providers = [...new Set(MODEL_PRESETS.map((p) => p.provider))]

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 min-w-[200px]"
    >
      {providers.map((provider) => (
        <optgroup key={provider} label={provider}>
          {MODEL_PRESETS.filter((p) => p.provider === provider).map((preset) => (
            <option key={preset.model} value={preset.model}>
              {preset.model}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
