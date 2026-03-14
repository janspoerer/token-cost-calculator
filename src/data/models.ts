export interface ModelPreset {
  provider: string
  model: string
  input: number
  cached: number
  output: number
}

export const MODEL_PRESETS: ModelPreset[] = [
  { provider: 'Anthropic', model: 'Claude 3.7 Sonnet', input: 3.0, cached: 0.3, output: 15.0 },
  { provider: 'Anthropic', model: 'Claude 3.5 Haiku', input: 0.8, cached: 0.08, output: 4.0 },
  { provider: 'OpenAI', model: 'GPT-4o', input: 2.5, cached: 1.25, output: 10.0 },
  { provider: 'OpenAI', model: 'o3-mini', input: 1.1, cached: 0.55, output: 4.4 },
  { provider: 'Google', model: 'Gemini 2.0 Pro', input: 2.5, cached: 0.625, output: 15.0 },
  { provider: 'Google', model: 'Gemini 2.0 Flash', input: 1.25, cached: 0.31, output: 10.0 },
  { provider: 'Custom', model: 'Custom (Manual Entry)', input: 0, cached: 0, output: 0 },
]

export const CUSTOM_MODEL = 'Custom (Manual Entry)'

export function findPreset(modelName: string): ModelPreset | undefined {
  return MODEL_PRESETS.find((p) => p.model === modelName)
}
