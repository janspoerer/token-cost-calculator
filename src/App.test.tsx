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

function clickNext() {
  fireEvent.click(screen.getByText('Next'))
}

describe('App', () => {
  it('renders the header', () => {
    render(<App />)
    expect(screen.getByText('AI Token Cost Calculator')).toBeInTheDocument()
  })

  it('renders step indicator labels', () => {
    render(<App />)
    expect(screen.getByText('1. Model')).toBeInTheDocument()
    expect(screen.getByText('2. Scale')).toBeInTheDocument()
    expect(screen.getByText('3. Workflow')).toBeInTheDocument()
    expect(screen.getByText('4. Results')).toBeInTheDocument()
  })

  it('renders cost cards in sticky footer', () => {
    render(<App />)
    expect(screen.getByText('Daily Cost')).toBeInTheDocument()
    expect(screen.getByText('Monthly Cost')).toBeInTheDocument()
    expect(screen.getByText('Annual Cost')).toBeInTheDocument()
  })

  it('shows model step with caching controls initially', () => {
    render(<App />)
    expect(screen.getByText('Choose a Model')).toBeInTheDocument()
    expect(screen.getByText('Enable Caching')).toBeInTheDocument()
    expect(screen.getByText('Cache Hit Rate: 70%')).toBeInTheDocument()
  })

  it('hides cache hit rate when caching is disabled', () => {
    render(<App />)
    const checkboxes = screen.getAllByRole('checkbox')
    const cachingCheckbox = checkboxes[0]
    fireEvent.click(cachingCheckbox)
    expect(screen.queryByText(/Cache Hit Rate/)).not.toBeInTheDocument()
  })

  it('navigates to scale step on Next click', () => {
    render(<App />)
    clickNext()
    expect(screen.getByText('Set Your Scale')).toBeInTheDocument()
    expect(screen.getByText('Number of Users')).toBeInTheDocument()
    expect(screen.getByText('Uses per User per Day')).toBeInTheDocument()
  })

  it('navigates to workflow step', () => {
    render(<App />)
    clickNext()
    clickNext()
    expect(screen.getByText('Define Your Workflow')).toBeInTheDocument()
    expect(screen.getByText('Avg Input Tokens per Use')).toBeInTheDocument()
    expect(screen.getByText('Reasoning / Thinking Tokens')).toBeInTheDocument()
  })

  it('navigates to results step', () => {
    render(<App />)
    clickNext()
    clickNext()
    clickNext()
    expect(screen.getByText('Your Results')).toBeInTheDocument()
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument()
    expect(screen.getByText('Monthly Breakdown')).toBeInTheDocument()
    expect(screen.getByText('Uncached Input')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('navigates back with Back button', () => {
    render(<App />)
    clickNext()
    expect(screen.getByText('Set Your Scale')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByText('Choose a Model')).toBeInTheDocument()
  })

  it('renders model selector with default model', () => {
    render(<App />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('Claude Sonnet 4.6')
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

  it('shows reasoning slider when toggled on', () => {
    render(<App />)
    clickNext()
    clickNext()
    const checkboxes = screen.getAllByRole('checkbox')
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

  it('renders token estimator links on workflow step', () => {
    render(<App />)
    clickNext()
    clickNext()
    const links = screen.getAllByText('Estimate from pages/words')
    expect(links.length).toBe(2)
  })

  it('shows Start Over button on results step', () => {
    render(<App />)
    clickNext()
    clickNext()
    clickNext()
    expect(screen.getByText('Start Over')).toBeInTheDocument()
  })

  it('allows clicking step indicators to jump to a step', () => {
    render(<App />)
    fireEvent.click(screen.getByText('3. Workflow'))
    expect(screen.getByText('Define Your Workflow')).toBeInTheDocument()
  })
})
