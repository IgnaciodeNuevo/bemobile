import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import App from '@/App'

vi.mock('@/services/index', () => ({
  getCharacters: vi.fn().mockResolvedValue({
    results: [],
    error: 'OK',
    limit: 50,
    offset: 0,
    number_of_page_results: 0,
    number_of_total_results: 0,
    status_code: 1,
  }),
  searchCharacters: vi.fn().mockResolvedValue({
    results: [],
    error: 'OK',
    limit: 50,
    offset: 0,
    number_of_page_results: 0,
    number_of_total_results: 0,
    status_code: 1,
  }),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('0 RESULTS')).toBeInTheDocument()
    })
  })

  it('should render header', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('marvel-logo')).toBeInTheDocument()
    })
  })

  it('should render search bar', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument()
    })
  })
})