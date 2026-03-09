import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

// recharts uses ResizeObserver internally
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

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

  it('renders cost cards', () => {
    render(<App />)
    expect(screen.getByText('Daily Cost')).toBeInTheDocument()
    expect(screen.getByText('Monthly Cost')).toBeInTheDocument()
    expect(screen.getByText('Annual Cost')).toBeInTheDocument()
  })

  it('shows caching controls when enabled', () => {
    render(<App />)
    expect(screen.getByText('Context Caching Enabled')).toBeInTheDocument()
    expect(screen.getByText('Cache Hit Rate: 100%')).toBeInTheDocument()
  })

  it('hides cache hit rate when caching is disabled', () => {
    render(<App />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(screen.queryByText(/Cache Hit Rate/)).not.toBeInTheDocument()
  })

  it('displays default values with correct costs', () => {
    render(<App />)
    // Default: 100 users, 10 uses/day, 2000 input tokens, 500 output tokens
    // Caching enabled at 100%, cached price $0, output price $15
    // tOut = 100 * 10 * 500 = 500,000 => output cost = 0.5M/1M * 15 = $7.50
    // All input is cached at $0 => $0 input cost
    // Daily = $7.50
    const matches = screen.getAllByText('$7.50')
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('shows breakdown table rows', () => {
    render(<App />)
    expect(screen.getByText('Uncached Input')).toBeInTheDocument()
    expect(screen.getByText('Cached Input')).toBeInTheDocument()
    expect(screen.getByText('Output')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })
})
