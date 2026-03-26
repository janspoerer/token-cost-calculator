import { useState, useCallback, useEffect } from 'react'
import { useCalculatorState } from './hooks/useCalculatorState'
import { TopBar } from './components/TopBar'
import { StepModel } from './components/steps/StepModel'
import { StepScale } from './components/steps/StepScale'
import { StepWorkflow } from './components/steps/StepWorkflow'
import { StepResults } from './components/steps/StepResults'
import { StickyFooter } from './components/StickyFooter'

const STEP_COUNT = 4

export default function App() {
  const state = useCalculatorState()
  const [step, setStep] = useState(0)

  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEP_COUNT - 1)), [])
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !(e.target instanceof HTMLSelectElement) &&
        !(e.target instanceof HTMLInputElement)
      ) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <TopBar
        exportURL={state.exportURL}
        step={step}
        onStepClick={setStep}
      />

      <main className="pb-28">
        <div className="max-w-2xl mx-auto p-6">
          {step === 0 && (
            <StepModel
              selectedModel={state.selectedModel}
              onModelChange={state.setSelectedModel}
              cachingEnabled={state.cachingEnabled}
              onCachingChange={state.setCachingEnabled}
              cacheHitRate={state.cacheHitRate}
              onCacheHitRateChange={state.setCacheHitRate}
              priceInput={state.priceInput}
              setPriceInput={state.setPriceInput}
              priceCached={state.priceCached}
              setPriceCached={state.setPriceCached}
              priceOutput={state.priceOutput}
              setPriceOutput={state.setPriceOutput}
              isCustomModel={state.isCustomModel}
            />
          )}
          {step === 1 && (
            <StepScale
              users={state.users}
              setUsers={state.setUsers}
              usesPerDay={state.usesPerDay}
              setUsesPerDay={state.setUsesPerDay}
            />
          )}
          {step === 2 && (
            <StepWorkflow
              inputTokens={state.inputTokens}
              setInputTokens={state.setInputTokens}
              outputTokens={state.outputTokens}
              setOutputTokens={state.setOutputTokens}
              agenticLoops={state.agenticLoops}
              setAgenticLoops={state.setAgenticLoops}
              reasoningEnabled={state.reasoningEnabled}
              setReasoningEnabled={state.setReasoningEnabled}
              reasoningMultiplier={state.reasoningMultiplier}
              setReasoningMultiplier={state.setReasoningMultiplier}
            />
          )}
          {step === 3 && <StepResults costs={state.costs} state={state} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {step < STEP_COUNT - 1 ? (
              <button
                type="button"
                onClick={next}
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(0)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
          {step < STEP_COUNT - 1 && (
            <p className="text-center text-xs text-slate-400 mt-3">
              Press Enter to continue
            </p>
          )}
        </div>
      </main>

      <StickyFooter costs={state.costs} />
    </div>
  )
}
