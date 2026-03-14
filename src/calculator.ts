export interface CalculatorInputs {
  users: number
  usesPerDay: number
  inputTokens: number
  outputTokens: number
  priceInput: number
  priceCached: number
  priceOutput: number
  cachingEnabled: boolean
  cacheHitRate: number
  agenticLoops: number
  reasoningMultiplier?: number
}

export interface CalculatorResult {
  daily: number
  monthly: number
  annual: number
  costUncachedInput: number
  costCachedInput: number
  costOutput: number
}

export function calculateCosts(inputs: CalculatorInputs): CalculatorResult {
  const {
    users,
    usesPerDay,
    inputTokens,
    outputTokens,
    priceInput,
    priceCached,
    priceOutput,
    cachingEnabled,
    cacheHitRate,
    agenticLoops,
    reasoningMultiplier = 1,
  } = inputs

  const tIn = users * usesPerDay * inputTokens * agenticLoops
  const tOut = users * usesPerDay * outputTokens * agenticLoops * reasoningMultiplier

  const h = cachingEnabled ? cacheHitRate / 100 : 0
  const cachedIn = tIn * h
  const uncachedIn = tIn * (1 - h)

  const costUncachedInput = (uncachedIn / 1e6) * priceInput
  const costCachedInput = (cachedIn / 1e6) * priceCached
  const costOutput = (tOut / 1e6) * priceOutput

  const daily = costUncachedInput + costCachedInput + costOutput
  const monthly = daily * 30
  const annual = daily * 365

  return {
    daily,
    monthly,
    annual,
    costUncachedInput,
    costCachedInput,
    costOutput,
  }
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}
