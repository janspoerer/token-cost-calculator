export interface ModelPreset {
  provider: string
  model: string
  input: number
  cached: number
  output: number
}

export const MODEL_PRESETS: ModelPreset[] = [
  // Anthropic
  { provider: 'Anthropic', model: 'Claude Opus 4.6', input: 5.0, cached: 0.5, output: 25.0 },
  { provider: 'Anthropic', model: 'Claude Sonnet 4.6', input: 3.0, cached: 0.3, output: 15.0 },
  { provider: 'Anthropic', model: 'Claude Haiku 4.5', input: 1.0, cached: 0.1, output: 5.0 },
  // OpenAI
  { provider: 'OpenAI', model: 'GPT-5.4', input: 2.5, cached: 0.25, output: 15.0 },
  { provider: 'OpenAI', model: 'GPT-4o', input: 2.5, cached: 1.25, output: 10.0 },
  { provider: 'OpenAI', model: 'o3-mini', input: 1.1, cached: 0.55, output: 4.4 },
  // xAI (Grok)
  { provider: 'xAI', model: 'Grok 4.20', input: 2.0, cached: 0.2, output: 6.0 },
  { provider: 'xAI', model: 'Grok 4.1 Fast', input: 0.2, cached: 0.05, output: 0.5 },
  // DeepSeek
  { provider: 'DeepSeek', model: 'DeepSeek V3.2 (Chat)', input: 0.28, cached: 0.028, output: 0.42 },
  { provider: 'DeepSeek', model: 'DeepSeek V3.2 (Reasoner)', input: 0.28, cached: 0.028, output: 0.42 },
  // MiniMax
  { provider: 'MiniMax', model: 'MiniMax M2.7', input: 0.3, cached: 0.06, output: 1.2 },
  { provider: 'MiniMax', model: 'MiniMax M2.5', input: 0.2, cached: 0.03, output: 0.95 },
  // Moonshot
  { provider: 'Moonshot', model: 'Kimi K2.5', input: 0.6, cached: 0.15, output: 2.5 },
  // Google
  { provider: 'Google', model: 'Gemini 3.1 Pro (Preview)', input: 2.0, cached: 0.2, output: 12.0 },
  { provider: 'Google', model: 'Gemini 3.1 Flash-Lite (Preview)', input: 0.25, cached: 0.025, output: 1.5 },
  { provider: 'Google', model: 'Gemini 3 Flash (Preview)', input: 0.5, cached: 0.05, output: 3.0 },
  // Custom
  { provider: 'Custom', model: 'Custom (Manual Entry)', input: 0, cached: 0, output: 0 },
]

export const CUSTOM_MODEL = 'Custom (Manual Entry)'

export function findPreset(modelName: string): ModelPreset | undefined {
  return MODEL_PRESETS.find((p) => p.model === modelName)
}
