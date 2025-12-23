import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from './Header'

const renderHeader = (onFavoritesClick?: () => void, onLogoClick?: () => void) => {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <Header onFavoritesClick={onFavoritesClick} onLogoClick={onLogoClick} />
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

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
      screen.getByRole('button', { name: /ver favoritos/i })
    ).toBeInTheDocument()
  })

  it('should call onFavoritesClick when favorites button is clicked', async () => {
    const handleClick = vi.fn()
    const { user } = renderHeader(handleClick)

    await user.click(screen.getByRole('button', { name: /ver favoritos/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should call onLogoClick when logo is clicked', async () => {
    const handleLogoClick = vi.fn()
    const { user } = renderHeader(undefined, handleLogoClick)

    const logo = screen.getByTestId('marvel-logo').closest('a')
    await user.click(logo!)

    expect(handleLogoClick).toHaveBeenCalledTimes(1)
  })

  it('should link logo to home', () => {
    renderHeader()

    const link = screen.getByRole('link', { name: /ir a la página principal/i })
    expect(link).toHaveAttribute('href', '/')
  })
})