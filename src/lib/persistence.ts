import { CUSTOM_MODEL } from '../data/models'

const STORAGE_KEY = 'token-calc-v1'

export interface PersistedState {
  selectedModel: string
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
  reasoningEnabled: boolean
  reasoningMultiplier: number
}

const PARAM_MAP: Record<keyof PersistedState, string> = {
  selectedModel: 'm',
  users: 'u',
  usesPerDay: 'upd',
  inputTokens: 'it',
  outputTokens: 'ot',
  priceInput: 'pi',
  priceCached: 'pc',
  priceOutput: 'po',
  cachingEnabled: 'ce',
  cacheHitRate: 'chr',
  agenticLoops: 'al',
  reasoningEnabled: 're',
  reasoningMultiplier: 'rm',
}

const REVERSE_MAP: Record<string, keyof PersistedState> = Object.fromEntries(
  Object.entries(PARAM_MAP).map(([k, v]) => [v, k as keyof PersistedState]),
) as Record<string, keyof PersistedState>

export function saveToLocalStorage(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable or full — ignore silently
  }
}

export function loadFromLocalStorage(): Partial<PersistedState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Partial<PersistedState>
  } catch {
    return null
  }
}

export function encodeStateToURL(state: PersistedState): string {
  const params = new URLSearchParams()
  for (const [key, paramName] of Object.entries(PARAM_MAP)) {
    const value = state[key as keyof PersistedState]
    if (value !== undefined && value !== null) {
      params.set(paramName, String(value))
    }
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function decodeStateFromURL(search: string): Partial<PersistedState> | null {
  const params = new URLSearchParams(search)
  if (params.size === 0) return null

  const result: Partial<PersistedState> = {}
  let found = false

  for (const [paramName, stateKey] of Object.entries(REVERSE_MAP)) {
    const raw = params.get(paramName)
    if (raw === null) continue
    found = true

    if (stateKey === 'selectedModel') {
      result.selectedModel = raw
    } else if (stateKey === 'cachingEnabled' || stateKey === 'reasoningEnabled') {
      result[stateKey] = raw === 'true'
    } else {
      const num = Number(raw)
      if (!isNaN(num)) {
        (result as Record<string, unknown>)[stateKey] = num
      }
    }
  }

  return found ? result : null
}

export function getDefaultModel(): string {
  return CUSTOM_MODEL
}
