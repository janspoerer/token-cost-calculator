import { describe, it, expect, beforeEach } from 'vitest'
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  encodeStateToURL,
  decodeStateFromURL,
  type PersistedState,
} from './lib/persistence'

const sampleState: PersistedState = {
  selectedModel: 'GPT-4o',
  users: 50,
  usesPerDay: 5,
  inputTokens: 1000,
  outputTokens: 250,
  priceInput: 2.5,
  priceCached: 1.25,
  priceOutput: 10.0,
  cachingEnabled: true,
  cacheHitRate: 80,
  agenticLoops: 3,
  reasoningEnabled: true,
  reasoningMultiplier: 2.5,
}

describe('localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads state round-trip', () => {
    saveToLocalStorage(sampleState)
    const loaded = loadFromLocalStorage()
    expect(loaded).toEqual(sampleState)
  })

  it('returns null when nothing stored', () => {
    expect(loadFromLocalStorage()).toBeNull()
  })

  it('returns null for corrupted data', () => {
    localStorage.setItem('token-calc-v1', 'not-json')
    expect(loadFromLocalStorage()).toBeNull()
  })
})

describe('URL encoding/decoding', () => {
  it('encodes state to URL with params', () => {
    const url = encodeStateToURL(sampleState)
    expect(url).toContain('m=GPT-4o')
    expect(url).toContain('u=50')
    expect(url).toContain('upd=5')
    expect(url).toContain('it=1000')
    expect(url).toContain('ot=250')
    expect(url).toContain('ce=true')
    expect(url).toContain('chr=80')
    expect(url).toContain('re=true')
    expect(url).toContain('rm=2.5')
  })

  it('decodes URL params back to state', () => {
    const search = '?m=GPT-4o&u=50&upd=5&it=1000&ot=250&pi=2.5&pc=1.25&po=10&ce=true&chr=80&al=3&re=true&rm=2.5'
    const result = decodeStateFromURL(search)
    expect(result).toEqual(sampleState)
  })

  it('returns null for empty search', () => {
    expect(decodeStateFromURL('')).toBeNull()
    expect(decodeStateFromURL('?')).toBeNull()
  })

  it('handles partial params gracefully', () => {
    const result = decodeStateFromURL('?u=200&it=5000')
    expect(result).toEqual({ users: 200, inputTokens: 5000 })
  })

  it('ignores invalid numeric values', () => {
    const result = decodeStateFromURL('?u=abc')
    // Param was found but value was invalid, so no fields populated
    expect(result).toEqual({})
  })

  it('round-trips through encode/decode', () => {
    const url = encodeStateToURL(sampleState)
    const search = '?' + url.split('?')[1]
    const decoded = decodeStateFromURL(search)
    expect(decoded).toEqual(sampleState)
  })
})
