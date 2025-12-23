import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import App from '@/App'

vi.mock('@/services/index', () => ({
  getCharacters: vi.fn().mockResolvedValue({
    results: [
      {
        id: 1,
        name: 'Spider-Man',
        real_name: 'Peter Parker',
        deck: 'Hero',
        description: 'Bitten by a spider',
        image: { medium_url: 'http://image.url', original_url: 'http://original.url' },
        api_detail_url: 'http://api.url',
      },
    ],
    error: 'OK',
    limit: 50,
    offset: 0,
    number_of_page_results: 1,
    number_of_total_results: 1,
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
  getCharacterById: vi.fn().mockResolvedValue({
    results: {
      id: 1,
      name: 'Spider-Man',
      real_name: 'Peter Parker',
      deck: 'Hero',
      description: 'Bitten by a spider',
      image: { medium_url: 'http://image.url', original_url: 'http://original.url' },
      api_detail_url: 'http://api.url',
    },
    error: 'OK',
    status_code: 1,
  }),
  getCharacterComics: vi.fn().mockResolvedValue({
    results: [],
    error: 'OK',
    status_code: 1,
  }),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render header with logo', async () => {
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

  it('should render characters after loading', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })
  })

  it('should toggle favorites view when clicking favorites button', async () => {
    const { user } = render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })

    const favoritesButton = screen.getByRole('button', { name: /ver favoritos/i })
    await user.click(favoritesButton)

    expect(screen.getByText('FAVORITES')).toBeInTheDocument()
  })

  it('should return to characters view when clicking logo', async () => {
    const { user } = render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })

    const favoritesButton = screen.getByRole('button', { name: /ver favoritos/i })
    await user.click(favoritesButton)

    expect(screen.getByText('FAVORITES')).toBeInTheDocument()

    const logo = screen.getByTestId('marvel-logo').closest('a')
    await user.click(logo!)

    await waitFor(() => {
      expect(screen.getByText('1 RESULTS')).toBeInTheDocument()
    })
  })
})
