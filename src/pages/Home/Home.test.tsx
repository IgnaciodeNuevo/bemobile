import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Home } from './Home'

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
    results: [
      {
        id: 2,
        name: 'Spider-Woman',
        real_name: 'Jessica Drew',
        deck: 'Hero',
        description: 'Another spider hero',
        image: { medium_url: 'http://image2.url', original_url: 'http://original2.url' },
        api_detail_url: 'http://api2.url',
      },
    ],
    error: 'OK',
    limit: 50,
    offset: 0,
    number_of_page_results: 1,
    number_of_total_results: 1,
    status_code: 1,
  }),
}))

const renderHome = (showFavorites = false) => {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <Home showFavorites={showFavorites} />
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render loading state initially', async () => {
    renderHome()

    expect(screen.getByText('Cargando...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
    })
  })

  it('should render characters after loading', async () => {
    renderHome()

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })
  })

  it('should render results count', async () => {
    renderHome()

    await waitFor(() => {
      expect(screen.getByText('1 RESULTS')).toBeInTheDocument()
    })
  })

  it('should render search bar when not showing favorites', async () => {
    renderHome()

    expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })
  })

  it('should not render search bar when showing favorites', async () => {
    renderHome(true)

    expect(screen.queryByPlaceholderText('SEARCH A CHARACTER...')).not.toBeInTheDocument()
  })

  it('should show favorites title when showing favorites', async () => {
    renderHome(true)

    expect(screen.getByText('FAVORITES')).toBeInTheDocument()
  })

  it('should show empty message when no favorites', async () => {
    renderHome(true)

    expect(screen.getByText('No tienes personajes favoritos')).toBeInTheDocument()
  })

  it('should search characters when typing', async () => {
    const { searchCharacters } = await import('@/services/index')
    const { user } = renderHome()

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('SEARCH A CHARACTER...')
    await user.type(input, 'Spider')

    await waitFor(() => {
      expect(searchCharacters).toHaveBeenCalled()
    })
  })
})
