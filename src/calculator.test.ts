import { describe, it, expect } from 'vitest'
import { calculateCosts, formatCurrency } from './calculator'

describe('formatCurrency', () => {
  it('formats small values with dollar sign', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(42.5)).toBe('$42.50')
    expect(formatCurrency(999.99)).toBe('$999.99')
  })

  it('formats thousands with K suffix', () => {
    expect(formatCurrency(1000)).toBe('$1.00K')
    expect(formatCurrency(1500)).toBe('$1.50K')
    expect(formatCurrency(999999)).toBe('$1000.00K')
  })

  it('formats millions with M suffix', () => {
    expect(formatCurrency(1_000_000)).toBe('$1.00M')
    expect(formatCurrency(2_500_000)).toBe('$2.50M')
  })
})

describe('calculateCosts', () => {
  const baseInputs = {
    users: 100,
    usesPerDay: 10,
    inputTokens: 2000,
    outputTokens: 500,
    priceInput: 3.0,
    priceCached: 0.3,
    priceOutput: 15.0,
    cachingEnabled: false,
    cacheHitRate: 0,
    agenticLoops: 1,
  }

  it('calculates basic costs without caching', () => {
    const result = calculateCosts(baseInputs)

    // tIn = 100 * 10 * 2000 * 1 = 2,000,000
    // tOut = 100 * 10 * 500 * 1 = 500,000
    // costUncachedInput = (2,000,000 / 1e6) * 3.0 = 6.0
    // costCachedInput = 0
    // costOutput = (500,000 / 1e6) * 15.0 = 7.5
    // daily = 13.5

    expect(result.costUncachedInput).toBeCloseTo(6.0)
    expect(result.costCachedInput).toBeCloseTo(0)
    expect(result.costOutput).toBeCloseTo(7.5)
    expect(result.daily).toBeCloseTo(13.5)
    expect(result.monthly).toBeCloseTo(13.5 * 30)
    expect(result.annual).toBeCloseTo(13.5 * 365)
  })

  it('applies caching correctly', () => {
    const result = calculateCosts({
      ...baseInputs,
      cachingEnabled: true,
      cacheHitRate: 80,
    })

    // tIn = 2,000,000
    // cachedIn = 2,000,000 * 0.8 = 1,600,000
    // uncachedIn = 2,000,000 * 0.2 = 400,000
    // costUncachedInput = (400,000 / 1e6) * 3.0 = 1.2
    // costCachedInput = (1,600,000 / 1e6) * 0.3 = 0.48
    // costOutput = 7.5
    // daily = 9.18

    expect(result.costUncachedInput).toBeCloseTo(1.2)
    expect(result.costCachedInput).toBeCloseTo(0.48)
    expect(result.costOutput).toBeCloseTo(7.5)
    expect(result.daily).toBeCloseTo(9.18)
  })

  it('100% cache hit rate means zero uncached cost', () => {
    const result = calculateCosts({
      ...baseInputs,
      cachingEnabled: true,
      cacheHitRate: 100,
    })

    expect(result.costUncachedInput).toBeCloseTo(0)
    expect(result.costCachedInput).toBeCloseTo(
      (2_000_000 / 1e6) * 0.3, // 0.6
    )
  })

  it('caching disabled ignores cache hit rate', () => {
    const withCaching = calculateCosts({
      ...baseInputs,
      cachingEnabled: false,
      cacheHitRate: 80,
    })
    const withoutRate = calculateCosts({
      ...baseInputs,
      cachingEnabled: false,
      cacheHitRate: 0,
    })

    expect(withCaching.daily).toBeCloseTo(withoutRate.daily)
    expect(withCaching.costCachedInput).toBe(0)
  })

  it('multiplies tokens by agentic loops', () => {
    const loops1 = calculateCosts({ ...baseInputs, agenticLoops: 1 })
    const loops5 = calculateCosts({ ...baseInputs, agenticLoops: 5 })

    expect(loops5.daily).toBeCloseTo(loops1.daily * 5)
    expect(loops5.costOutput).toBeCloseTo(loops1.costOutput * 5)
    expect(loops5.costUncachedInput).toBeCloseTo(loops1.costUncachedInput * 5)
  })

  it('monthly is daily * 30, annual is daily * 365', () => {
    const result = calculateCosts(baseInputs)

    expect(result.monthly).toBe(result.daily * 30)
    expect(result.annual).toBe(result.daily * 365)
  })

  it('handles zero users gracefully', () => {
    const result = calculateCosts({ ...baseInputs, users: 0 })

    expect(result.daily).toBe(0)
    expect(result.monthly).toBe(0)
    expect(result.annual).toBe(0)
  })

  it('handles zero tokens', () => {
    const result = calculateCosts({
      ...baseInputs,
      inputTokens: 0,
      outputTokens: 0,
    })

    expect(result.daily).toBe(0)
  })

  it('reasoning multiplier doubles output cost', () => {
    const base = calculateCosts(baseInputs)
    const withReasoning = calculateCosts({ ...baseInputs, reasoningMultiplier: 2 })

    expect(withReasoning.costOutput).toBeCloseTo(base.costOutput * 2)
    // Input costs should be unchanged
    expect(withReasoning.costUncachedInput).toBeCloseTo(base.costUncachedInput)
  })

  it('reasoning multiplier of 3 triples output cost', () => {
    const base = calculateCosts(baseInputs)
    const withReasoning = calculateCosts({ ...baseInputs, reasoningMultiplier: 3 })

    expect(withReasoning.costOutput).toBeCloseTo(base.costOutput * 3)
  })

  it('defaults reasoning multiplier to 1 when omitted', () => {
    const withoutMultiplier = calculateCosts(baseInputs)
    const withMultiplier1 = calculateCosts({ ...baseInputs, reasoningMultiplier: 1 })

    expect(withoutMultiplier.daily).toBe(withMultiplier1.daily)
  })
})
