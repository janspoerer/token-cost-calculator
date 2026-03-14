import { useCalculatorState } from './hooks/useCalculatorState'
import { TopBar } from './components/TopBar'
import { MainContent } from './components/MainContent'
import { StickyFooter } from './components/StickyFooter'

export default function App() {
  const state = useCalculatorState()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <TopBar
        selectedModel={state.selectedModel}
        onModelChange={state.setSelectedModel}
        cachingEnabled={state.cachingEnabled}
        onCachingChange={state.setCachingEnabled}
        cacheHitRate={state.cacheHitRate}
        onCacheHitRateChange={state.setCacheHitRate}
        exportURL={state.exportURL}
      />

      <main className="pb-28">
        <MainContent
          users={state.users}
          setUsers={state.setUsers}
          usesPerDay={state.usesPerDay}
          setUsesPerDay={state.setUsesPerDay}
          inputTokens={state.inputTokens}
          setInputTokens={state.setInputTokens}
          outputTokens={state.outputTokens}
          setOutputTokens={state.setOutputTokens}
          agenticLoops={state.agenticLoops}
          setAgenticLoops={state.setAgenticLoops}
          priceInput={state.priceInput}
          setPriceInput={state.setPriceInput}
          priceCached={state.priceCached}
          setPriceCached={state.setPriceCached}
          priceOutput={state.priceOutput}
          setPriceOutput={state.setPriceOutput}
          isCustomModel={state.isCustomModel}
          reasoningEnabled={state.reasoningEnabled}
          setReasoningEnabled={state.setReasoningEnabled}
          reasoningMultiplier={state.reasoningMultiplier}
          setReasoningMultiplier={state.setReasoningMultiplier}
          costs={state.costs}
        />
      </main>

      <StickyFooter costs={state.costs} />
    </div>
  )
}
