import { useState } from 'react'
import { FileText } from 'lucide-react'

const TOKENS_PER_PAGE = 666
const TOKENS_PER_WORD = 1.332

export function TokenEstimator({
  onApply,
}: {
  onApply: (tokens: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState(0)
  const [words, setWords] = useState(0)

  const estimated = Math.round(pages * TOKENS_PER_PAGE + words * TOKENS_PER_WORD)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
      >
        <FileText className="w-3 h-3" />
        Estimate from pages/words
      </button>
    )
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">Token Estimator</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-slate-500">Pages</label>
          <input
            type="number"
            min={0}
            value={pages}
            onChange={(e) => setPages(+e.target.value || 0)}
            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Words</label>
          <input
            type="number"
            min={0}
            value={words}
            onChange={(e) => setWords(+e.target.value || 0)}
            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          ~{estimated.toLocaleString()} tokens
        </span>
        <button
          type="button"
          onClick={() => {
            if (estimated > 0) onApply(estimated)
            setOpen(false)
          }}
          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  )
}
