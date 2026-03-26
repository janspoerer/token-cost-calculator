export interface ModelPreset {
  provider: string
  model: string
  input: number
  cached: number
  output: number
  supportsCaching: boolean
}

export const MODEL_PRESETS: ModelPreset[] = [
  // Anthropic
  { provider: 'Anthropic', model: 'Claude Opus 4.6', input: 5.0, cached: 0.5, output: 25.0, supportsCaching: true },
  { provider: 'Anthropic', model: 'Claude Sonnet 4.6', input: 3.0, cached: 0.3, output: 15.0, supportsCaching: true },
  { provider: 'Anthropic', model: 'Claude Haiku 4.5', input: 1.0, cached: 0.1, output: 5.0, supportsCaching: true },
  // OpenAI
  { provider: 'OpenAI', model: 'GPT-5.4', input: 2.5, cached: 0.25, output: 15.0, supportsCaching: true },
  { provider: 'OpenAI', model: 'GPT-4o', input: 2.5, cached: 1.25, output: 10.0, supportsCaching: true },
  { provider: 'OpenAI', model: 'o3-mini', input: 1.1, cached: 0.55, output: 4.4, supportsCaching: true },
  // xAI (Grok)
  { provider: 'xAI', model: 'Grok 4.20', input: 2.0, cached: 0.2, output: 6.0, supportsCaching: true },
  { provider: 'xAI', model: 'Grok 4.1 Fast', input: 0.2, cached: 0.05, output: 0.5, supportsCaching: true },
  // DeepSeek
  { provider: 'DeepSeek', model: 'DeepSeek V3.2 (Chat)', input: 0.28, cached: 0.028, output: 0.42, supportsCaching: true },
  { provider: 'DeepSeek', model: 'DeepSeek V3.2 (Reasoner)', input: 0.28, cached: 0.028, output: 0.42, supportsCaching: true },
  // MiniMax
  { provider: 'MiniMax', model: 'MiniMax M2.7', input: 0.3, cached: 0.06, output: 1.2, supportsCaching: true },
  { provider: 'MiniMax', model: 'MiniMax M2.5', input: 0.2, cached: 0.03, output: 0.95, supportsCaching: true },
  // Moonshot
  { provider: 'Moonshot', model: 'Kimi K2.5', input: 0.6, cached: 0.15, output: 2.5, supportsCaching: true },
  // Google
  { provider: 'Google', model: 'Gemini 3.1 Pro (Preview)', input: 2.0, cached: 0.2, output: 12.0, supportsCaching: true },
  { provider: 'Google', model: 'Gemini 3.1 Flash-Lite (Preview)', input: 0.25, cached: 0.025, output: 1.5, supportsCaching: true },
  { provider: 'Google', model: 'Gemini 3 Flash (Preview)', input: 0.5, cached: 0.05, output: 3.0, supportsCaching: true },
  // Mistral
  { provider: 'Mistral', model: 'Mistral Large 3', input: 0.5, cached: 0.05, output: 1.5, supportsCaching: true },
  { provider: 'Mistral', model: 'Magistral Medium', input: 2.0, cached: 2.0, output: 5.0, supportsCaching: false },
  { provider: 'Mistral', model: 'Codestral', input: 0.3, cached: 0.03, output: 0.9, supportsCaching: true },
  { provider: 'Mistral', model: 'Mistral Small 3.1', input: 0.03, cached: 0.015, output: 0.11, supportsCaching: true },
  // Meta (via hosted providers)
  { provider: 'Meta', model: 'Llama 4 Maverick', input: 0.15, cached: 0.15, output: 0.6, supportsCaching: false },
  { provider: 'Meta', model: 'Llama 4 Scout', input: 0.08, cached: 0.08, output: 0.3, supportsCaching: false },
  // Amazon
  { provider: 'Amazon', model: 'Nova Premier 1.0', input: 2.5, cached: 2.5, output: 12.5, supportsCaching: false },
  { provider: 'Amazon', model: 'Nova Pro 1.0', input: 0.8, cached: 0.8, output: 3.2, supportsCaching: false },
  { provider: 'Amazon', model: 'Nova Lite 1.0', input: 0.06, cached: 0.06, output: 0.24, supportsCaching: false },
  // Cohere
  { provider: 'Cohere', model: 'Command R+', input: 2.5, cached: 2.5, output: 10.0, supportsCaching: false },
  { provider: 'Cohere', model: 'Command R', input: 0.5, cached: 0.5, output: 1.5, supportsCaching: false },
  // Alibaba
  { provider: 'Alibaba', model: 'Qwen3 Max', input: 1.2, cached: 1.2, output: 6.0, supportsCaching: false },
  { provider: 'Alibaba', model: 'Qwen3.5 Plus', input: 0.4, cached: 0.4, output: 2.4, supportsCaching: false },
  // Custom
  { provider: 'Custom', model: 'Custom (Manual Entry)', input: 0, cached: 0, output: 0, supportsCaching: true },
]

export const CUSTOM_MODEL = 'Custom (Manual Entry)'

export function findPreset(modelName: string): ModelPreset | undefined {
  return MODEL_PRESETS.find((p) => p.model === modelName)
}
