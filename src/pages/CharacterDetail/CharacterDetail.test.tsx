import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { CharacterDetail } from './CharacterDetail'

vi.mock('@/services/index', () => ({
  getCharacterById: vi.fn().mockResolvedValue({
    results: {
      id: 1,
      name: 'Spider-Man',
      real_name: 'Peter Parker',
      deck: 'Your friendly neighborhood Spider-Man',
      description: 'Bitten by a radioactive spider',
      image: { medium_url: 'http://image.url', original_url: 'http://original.url' },
      api_detail_url: 'http://api.url',
    },
    error: 'OK',
    status_code: 1,
  }),
  getCharacterComics: vi.fn().mockResolvedValue({
    results: [
      {
        id: 100,
        name: 'Amazing Spider-Man',
        issue_number: '1',
        cover_date: '2020-01-15',
        image: { medium_url: 'http://comic.url' },
      },
    ],
    error: 'OK',
    status_code: 1,
  }),
}))

const renderCharacterDetail = (id = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/character/${id}`]}>
      <FavoritesProvider>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('CharacterDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should render loading state initially', async () => {
    renderCharacterDetail()

    expect(screen.getByText('Cargando...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
    })
  })

  it('should render character name after loading', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })
  })

  it('should render character description', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('Your friendly neighborhood Spider-Man')).toBeInTheDocument()
    })
  })

  it('should render character image', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      const img = screen.getByAltText('Imagen de Spider-Man')
      expect(img).toHaveAttribute('src', 'http://original.url')
    })
  })

  it('should render comics section', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('Comics')).toBeInTheDocument()
    })
  })

  it('should render comic title', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('Amazing Spider-Man')).toBeInTheDocument()
    })
  })

  it('should render comic year', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('2020')).toBeInTheDocument()
    })
  })

  it('should toggle favorite when clicking favorite button', async () => {
    const { user } = renderCharacterDetail()

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /añadir spider-man a favoritos/i })
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /quitar spider-man de favoritos/i })
      ).toBeInTheDocument()
    })
  })

  it('should have accessible favorite button', async () => {
    renderCharacterDetail()

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /añadir spider-man a favoritos/i })
      ).toBeInTheDocument()
    })
  })
})
