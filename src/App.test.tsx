import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

// recharts uses ResizeObserver internally
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState({}, '', '/')
})

describe('App', () => {
  it('renders the header', () => {
    render(<App />)
    expect(screen.getByText('AI Token Cost Calculator')).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<App />)
    expect(screen.getByText('Scale')).toBeInTheDocument()
    expect(screen.getByText('Workflow')).toBeInTheDocument()
    expect(screen.getByText('Model Pricing (per 1M Tokens)')).toBeInTheDocument()
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument()
    expect(screen.getByText('Daily Breakdown')).toBeInTheDocument()
  })

  it('renders cost cards in sticky footer', () => {
    render(<App />)
    expect(screen.getByText('Daily Cost')).toBeInTheDocument()
    expect(screen.getByText('Monthly Cost')).toBeInTheDocument()
    expect(screen.getByText('Annual Cost')).toBeInTheDocument()
  })

  it('shows caching controls in top bar', () => {
    render(<App />)
    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('Hit Rate: 100%')).toBeInTheDocument()
  })

  it('hides cache hit rate when caching is disabled', () => {
    render(<App />)
    // Find the Caching checkbox specifically
    const checkboxes = screen.getAllByRole('checkbox')
    const cachingCheckbox = checkboxes[0] // First checkbox is caching
    fireEvent.click(cachingCheckbox)
    expect(screen.queryByText(/Hit Rate/)).not.toBeInTheDocument()
  })

  it('shows breakdown table rows', () => {
    render(<App />)
    expect(screen.getByText('Uncached Input')).toBeInTheDocument()
    expect(screen.getByText('Cached Input')).toBeInTheDocument()
    expect(screen.getByText('Output')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('renders model selector with default model', () => {
    render(<App />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('Claude 3.7 Sonnet')
  })

  it('shows read-only pricing hint for preset models', () => {
    render(<App />)
    expect(screen.getByText(/Prices are set by the selected model/)).toBeInTheDocument()
  })

  it('hides read-only hint when Custom model selected', () => {
    render(<App />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Custom (Manual Entry)' } })
    expect(screen.queryByText(/Prices are set by the selected model/)).not.toBeInTheDocument()
  })

  it('renders reasoning toggle', () => {
    render(<App />)
    expect(screen.getByText('Reasoning / Thinking Tokens')).toBeInTheDocument()
  })

  it('shows reasoning slider when toggled on', () => {
    render(<App />)
    const checkboxes = screen.getAllByRole('checkbox')
    // Reasoning checkbox is the second one
    const reasoningCheckbox = checkboxes.find((cb) => {
      const label = cb.closest('label')
      return label?.textContent?.includes('Reasoning')
    })
    if (reasoningCheckbox) {
      fireEvent.click(reasoningCheckbox)
      expect(screen.getByText(/Output multiplier/)).toBeInTheDocument()
    }
  })

  it('renders share button', () => {
    render(<App />)
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('renders token estimator links', () => {
    render(<App />)
    const links = screen.getAllByText('Estimate from pages/words')
    expect(links.length).toBe(2) // One for input, one for output
  })
})
