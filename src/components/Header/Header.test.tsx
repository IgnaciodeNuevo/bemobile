import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from './Header'

const renderHeader = (onFavoritesClick?: () => void) => {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <Header onFavoritesClick={onFavoritesClick} />
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('Header', () => {
  it('should render logo', () => {
    renderHeader()

    expect(screen.getByTestId('marvel-logo')).toBeInTheDocument()
  })

  it('should render favorites button with count 0', () => {
    renderHeader()

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should have accessible label for favorites', () => {
    renderHeader()

    expect(
      screen.getByRole('button', { name: /favoritos: 0 personajes/i })
    ).toBeInTheDocument()
  })

  it('should call onFavoritesClick when favorites button is clicked', async () => {
    const handleClick = vi.fn()
    const { user } = renderHeader(handleClick)

    await user.click(screen.getByRole('button', { name: /favoritos/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should link logo to home', () => {
    renderHeader()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })
})