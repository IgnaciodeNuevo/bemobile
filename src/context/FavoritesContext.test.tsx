import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@/tests/test-utils'
import { FavoritesProvider, useFavorites } from './FavoritesContext'
import { Character } from '@/types'

const mockCharacter: Character = {
  id: 1,
  name: 'Spider-Man',
  real_name: 'Peter Parker',
  deck: 'Hero',
  description: 'Bitten by a spider',
  image: { medium_url: 'http://image.url', original_url: 'http://original.url' },
  api_detail_url: 'http://api.url',
}

const mockCharacter2: Character = {
  id: 2,
  name: 'Batman',
  real_name: 'Bruce Wayne',
  deck: 'Dark Knight',
  description: 'Gotham hero',
  image: { medium_url: 'http://image2.url', original_url: 'http://original2.url' },
  api_detail_url: 'http://api2.url',
}

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <span data-testid="is-favorite-1">{isFavorite(1) ? 'yes' : 'no'}</span>
      <button onClick={() => addFavorite(mockCharacter)}>Add Spider-Man</button>
      <button onClick={() => addFavorite(mockCharacter2)}>Add Batman</button>
      <button onClick={() => removeFavorite(1)}>Remove Spider-Man</button>
    </div>
  )
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should start with empty favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should add a favorite', async () => {
    const { user } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    await user.click(screen.getByText('Add Spider-Man'))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('yes')
  })

  it('should not add duplicate favorites', async () => {
    const { user } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    await user.click(screen.getByText('Add Spider-Man'))
    await user.click(screen.getByText('Add Spider-Man'))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('should add multiple different favorites', async () => {
    const { user } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    await user.click(screen.getByText('Add Spider-Man'))
    await user.click(screen.getByText('Add Batman'))

    expect(screen.getByTestId('count')).toHaveTextContent('2')
  })

  it('should remove a favorite', async () => {
    const { user } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    await user.click(screen.getByText('Add Spider-Man'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')

    await user.click(screen.getByText('Remove Spider-Man'))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('no')
  })

  it('should persist favorites to localStorage', async () => {
    const { user } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    await user.click(screen.getByText('Add Spider-Man'))

    const stored = localStorage.getItem('bemobile_favorites')
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored!)).toHaveLength(1)
  })

  it('should load favorites from localStorage', () => {
    localStorage.setItem('bemobile_favorites', JSON.stringify([mockCharacter]))

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('yes')
  })

  it('should throw error when useFavorites is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => render(<TestComponent />)).toThrow(
      'useFavorites must be used within a FavoritesProvider'
    )

    consoleError.mockRestore()
  })
})