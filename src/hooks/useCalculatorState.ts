import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { calculateCosts, type CalculatorResult } from '../calculator'
import { findPreset, CUSTOM_MODEL } from '../data/models'
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  decodeStateFromURL,
  encodeStateToURL,
  type PersistedState,
} from '../lib/persistence'

export interface CalculatorState {
  // Model
  selectedModel: string
  setSelectedModel: (model: string) => void
  isCustomModel: boolean

  // Scale
  users: number
  setUsers: (v: number) => void
  usesPerDay: number
  setUsesPerDay: (v: number) => void

  // Workflow
  inputTokens: number
  setInputTokens: (v: number) => void
  outputTokens: number
  setOutputTokens: (v: number) => void
  agenticLoops: number
  setAgenticLoops: (v: number) => void

  // Pricing
  priceInput: number
  setPriceInput: (v: number) => void
  priceCached: number
  setPriceCached: (v: number) => void
  priceOutput: number
  setPriceOutput: (v: number) => void

  // Caching
  cachingEnabled: boolean
  setCachingEnabled: (v: boolean) => void
  cacheHitRate: number
  setCacheHitRate: (v: number) => void

  // Reasoning
  reasoningEnabled: boolean
  setReasoningEnabled: (v: boolean) => void
  reasoningMultiplier: number
  setReasoningMultiplier: (v: number) => void

  // Computed
  costs: CalculatorResult

  // Utilities
  exportURL: () => string
}

function getInitialState(): PersistedState {
  const defaults: PersistedState = {
    selectedModel: 'Claude Sonnet 4.6',
    users: 100,
    usesPerDay: 10,
    inputTokens: 2000,
    outputTokens: 500,
    priceInput: 3.0,
    priceCached: 0.3,
    priceOutput: 15.0,
    cachingEnabled: true,
    cacheHitRate: 100,
    agenticLoops: 1,
    reasoningEnabled: false,
    reasoningMultiplier: 2.0,
  }

  // URL params take priority
  const fromURL = decodeStateFromURL(window.location.search)
  if (fromURL) {
    // Clear URL params after reading
    window.history.replaceState({}, '', window.location.pathname)
    const merged = { ...defaults, ...fromURL }
    // If model was set from URL, apply its pricing
    if (fromURL.selectedModel) {
      const preset = findPreset(fromURL.selectedModel)
      if (preset && preset.model !== CUSTOM_MODEL) {
        merged.priceInput = fromURL.priceInput ?? preset.input
        merged.priceCached = fromURL.priceCached ?? preset.cached
        merged.priceOutput = fromURL.priceOutput ?? preset.output
      }
    }
    return merged
  }

  // Then localStorage
  const fromStorage = loadFromLocalStorage()
  if (fromStorage) {
    return { ...defaults, ...fromStorage }
  }

  return defaults
}

export function useCalculatorState(): CalculatorState {
  const initial = useRef(getInitialState()).current

  const [selectedModel, setSelectedModelRaw] = useState(initial.selectedModel)
  const [users, setUsers] = useState(initial.users)
  const [usesPerDay, setUsesPerDay] = useState(initial.usesPerDay)
  const [inputTokens, setInputTokens] = useState(initial.inputTokens)
  const [outputTokens, setOutputTokens] = useState(initial.outputTokens)
  const [priceInput, setPriceInput] = useState(initial.priceInput)
  const [priceCached, setPriceCached] = useState(initial.priceCached)
  const [priceOutput, setPriceOutput] = useState(initial.priceOutput)
  const [cachingEnabled, setCachingEnabled] = useState(initial.cachingEnabled)
  const [cacheHitRate, setCacheHitRate] = useState(initial.cacheHitRate)
  const [agenticLoops, setAgenticLoops] = useState(initial.agenticLoops)
  const [reasoningEnabled, setReasoningEnabled] = useState(initial.reasoningEnabled)
  const [reasoningMultiplier, setReasoningMultiplier] = useState(initial.reasoningMultiplier)

  const isCustomModel = selectedModel === CUSTOM_MODEL

  const setSelectedModel = useCallback(
    (model: string) => {
      setSelectedModelRaw(model)
      const preset = findPreset(model)
      if (preset && model !== CUSTOM_MODEL) {
        setPriceInput(preset.input)
        setPriceCached(preset.cached)
        setPriceOutput(preset.output)
      }
    },
    [],
  )

  const costs = useMemo(
    () =>
      calculateCosts({
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
        reasoningMultiplier: reasoningEnabled ? reasoningMultiplier : 1,
      }),
    [
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
      reasoningEnabled,
      reasoningMultiplier,
    ],
  )

  // Debounced localStorage save
  useEffect(() => {
    const state: PersistedState = {
      selectedModel,
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
      reasoningEnabled,
      reasoningMultiplier,
    }
    const timer = setTimeout(() => saveToLocalStorage(state), 300)
    return () => clearTimeout(timer)
  }, [
    selectedModel,
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
    reasoningEnabled,
    reasoningMultiplier,
  ])

  const exportURL = useCallback(() => {
    return encodeStateToURL({
      selectedModel,
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
      reasoningEnabled,
      reasoningMultiplier,
    })
  }, [
    selectedModel,
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
    reasoningEnabled,
    reasoningMultiplier,
  ])

  return {
    selectedModel,
    setSelectedModel,
    isCustomModel,
    users,
    setUsers,
    usesPerDay,
    setUsesPerDay,
    inputTokens,
    setInputTokens,
    outputTokens,
    setOutputTokens,
    agenticLoops,
    setAgenticLoops,
    priceInput,
    setPriceInput,
    priceCached,
    setPriceCached,
    priceOutput,
    setPriceOutput,
    cachingEnabled,
    setCachingEnabled,
    cacheHitRate,
    setCacheHitRate,
    reasoningEnabled,
    setReasoningEnabled,
    reasoningMultiplier,
    setReasoningMultiplier,
    costs,
    exportURL,
  }
}
