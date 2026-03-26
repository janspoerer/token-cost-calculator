import { NumberInput } from '../ui/NumberInput'
import { SliderInput } from '../ui/SliderInput'
import { TokenEstimator } from '../TokenEstimator'
import { ReasoningToggle } from '../ReasoningToggle'

export function StepWorkflow({
  inputTokens,
  setInputTokens,
  outputTokens,
  setOutputTokens,
  agenticLoops,
  setAgenticLoops,
  reasoningEnabled,
  setReasoningEnabled,
  reasoningMultiplier,
  setReasoningMultiplier,
}: {
  inputTokens: number
  setInputTokens: (v: number) => void
  outputTokens: number
  setOutputTokens: (v: number) => void
  agenticLoops: number
  setAgenticLoops: (v: number) => void
  reasoningEnabled: boolean
  setReasoningEnabled: (v: boolean) => void
  reasoningMultiplier: number
  setReasoningMultiplier: (v: number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          Define Your Workflow
        </h2>
        <p className="text-sm text-slate-500">
          How many tokens per request and any advanced settings.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
        {/* Input tokens */}
        <div className="space-y-1">
          <NumberInput
            label="Avg Input Tokens per Use"
            value={inputTokens}
            onChange={setInputTokens}
            min={0}
            step={100}
          />
          <TokenEstimator onApply={setInputTokens} />
        </div>

        {/* Output tokens */}
        <div className="space-y-1">
          <NumberInput
            label="Avg Output Tokens per Use"
            value={outputTokens}
            onChange={setOutputTokens}
            min={0}
            step={100}
          />
          <TokenEstimator onApply={setOutputTokens} />
        </div>

        {/* Agentic loops */}
        <div className="pt-3 border-t border-slate-100">
          <SliderInput
            label="Agentic Multi-Turn Loops"
            value={agenticLoops}
            onChange={setAgenticLoops}
            min={1}
            max={10}
            step={1}
          />
        </div>

        {/* Reasoning */}
        <div className="pt-3 border-t border-slate-100">
          <ReasoningToggle
            enabled={reasoningEnabled}
            onToggle={setReasoningEnabled}
            multiplier={reasoningMultiplier}
            onMultiplierChange={setReasoningMultiplier}
          />
        </div>
      </div>
    </div>
  )
}
