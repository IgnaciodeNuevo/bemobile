import { Link } from 'react-router-dom'
import { useFavorites } from '@/context/index'
import { Logo } from '@/components/Logo/index'

interface HeaderProps {
  onFavoritesClick?: () => void
}

export function Header({ onFavoritesClick }: HeaderProps) {
  const { favorites } = useFavorites()

  return (
    <header>
      <Link to="/" >
        <Logo />
      </Link>
      <button
        onClick={onFavoritesClick}
        aria-label={`Favoritos: ${favorites.length} personajes`}
      >
        <span>♥</span>
        <span>{favorites.length}</span>
      </button>
    </header>
  )
}