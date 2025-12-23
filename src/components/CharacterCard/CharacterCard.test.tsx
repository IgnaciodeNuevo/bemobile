import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { CharacterCard } from './CharacterCard'
import { Character } from '@/types/index'

const mockCharacter: Character = {
  id: 1,
  name: 'Spider-Man',
  real_name: 'Peter Parker',
  deck: 'Hero',
  description: 'Bitten by a spider',
  image: { medium_url: 'http://image.url', original_url: 'http://original.url' },
  api_detail_url: 'http://api.url',
}

const renderCard = () => {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <CharacterCard character={mockCharacter} />
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('CharacterCard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render character name', () => {
    renderCard()

    expect(screen.getByText('Spider-Man')).toBeInTheDocument()
  })

  it('should render character image', () => {
    renderCard()

    const img = screen.getByAltText('Spider-Man')
    expect(img).toHaveAttribute('src', 'http://image.url')
  })

  it('should link to character detail', () => {
    renderCard()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/character/1')
  })

  it('should show ghost heart when not favorite', () => {
    renderCard()

    const svg = document.querySelector('.favorite--ghost')
    expect(svg).toBeInTheDocument()
  })

  it('should show red heart when favorite', async () => {
    const { user } = renderCard()

    const button = screen.getByRole('button', { name: /añadir spider-man a favoritos/i })
    await user.click(button)

    const svg = document.querySelector('.favorite--red')
    expect(svg).toBeInTheDocument()
  })

  it('should toggle favorite when clicking favorite button', async () => {
    const { user } = renderCard()

    const button = screen.getByRole('button', { name: /añadir spider-man a favoritos/i })
    await user.click(button)

    expect(screen.getByRole('button', { name: /quitar spider-man de favoritos/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /quitar spider-man de favoritos/i }))

    expect(screen.getByRole('button', { name: /añadir spider-man a favoritos/i })).toBeInTheDocument()
  })

  it('should have accessible label for add favorite button', () => {
    renderCard()

    expect(screen.getByRole('button', { name: /añadir spider-man a favoritos/i })).toBeInTheDocument()
  })

  it('should have accessible label for remove favorite button', async () => {
    const { user } = renderCard()

    await user.click(screen.getByRole('button', { name: /añadir spider-man a favoritos/i }))

    expect(screen.getByRole('button', { name: /quitar spider-man de favoritos/i })).toBeInTheDocument()
  })

  it('should not navigate when clicking favorite button', async () => {
    const { user } = renderCard()

    const button = screen.getByRole('button', { name: /añadir spider-man a favoritos/i })
    await user.click(button)

    expect(screen.getByText('Spider-Man')).toBeInTheDocument()
  })

  it('should persist favorite state', async () => {
    const { user } = renderCard()

    await user.click(screen.getByRole('button', { name: /añadir spider-man a favoritos/i }))

    const stored = localStorage.getItem('bemobile_favorites')
    expect(stored).not.toBeNull()
    
    const favorites = JSON.parse(stored!)
    expect(favorites).toHaveLength(1)
    expect(favorites[0].id).toBe(1)
  })
})