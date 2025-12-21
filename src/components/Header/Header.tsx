import { Link } from 'react-router-dom'
import { useFavorites } from '@/context/index'
import { Logo } from '@/components/Logo/index'
import './Header.scss'

interface HeaderProps {
  onFavoritesClick?: () => void
}

export function Header({ onFavoritesClick }: HeaderProps) {
  const { favorites } = useFavorites()

  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
      <button
        className="header__favorites"
        onClick={onFavoritesClick}
        aria-label={`Favoritos: ${favorites.length} personajes`}
      >
        <span className="header__favorites-icon">♥</span>
        <span className="header__favorites-count">{favorites.length}</span>
      </button>
    </header>
  )
}