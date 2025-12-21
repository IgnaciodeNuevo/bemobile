import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import App from '@/App'

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should render header', () => {
    render(<App />)
    expect(screen.getByTestId('marvel-logo')).toBeInTheDocument()
  })
})