import { Link } from 'react-router-dom'
import { useFavorites } from '@/context/index'
import { Logo } from '@/components/Logo/index'
import { Favorite } from '@/components/Favorite/index'
import './Header.scss'

interface HeaderProps {
  onFavoritesClick?: () => void
  onLogoClick?: () => void
}

export function Header({ onFavoritesClick, onLogoClick }: HeaderProps) {
  const { favorites } = useFavorites()

  return (
    <header className="header" role="banner">
      <nav aria-label="Navegación principal">
        <Link to="/" onClick={onLogoClick} aria-label="Ir a la página principal">
          <Logo />
        </Link>
      </nav>
      <button
        className="header__favorites"
        onClick={onFavoritesClick}
        aria-label={`Ver favoritos. ${favorites.length} personajes guardados`}
      >
        <Favorite type="fav" />
        <span className="header__favorites-count" aria-hidden="true">{favorites.length}</span>
      </button>
    </header>
  )
}