import { Link } from 'react-router-dom'
import { Character } from '@/types/index'
import { Favorite } from '@/components/Favorite/index'
import { useFavorites } from '@/context/index'
import './CharacterCard.scss'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(character.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <div className="character-card__image">
        <img src={character.image.medium_url} alt={character.name} />
      </div>
      <div className="character-card__info">
        <span className="character-card__name">{character.name}</span>
        <button
          className="character-card__favorite"
          onClick={handleFavoriteClick}
          aria-label={favorite ? `Quitar ${character.name} de favoritos` : `Añadir ${character.name} a favoritos`}
        >
          <Favorite type={favorite ? 'fav' : 'nofav'} />
        </button>
      </div>
    </Link>
  )
}