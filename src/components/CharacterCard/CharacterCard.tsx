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
    e.stopPropagation()
    if (favorite) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  return (
    <article className="character-card">
      <Link 
        to={`/character/${character.id}`} 
        className="character-card__link"
        aria-label={`Ver detalles de ${character.name}`}
      >
        <div className="character-card__image">
          <img 
            src={character.image.medium_url} 
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="character-card__info">
          <h2 className="character-card__name">{character.name}</h2>
          <button
            className="character-card__favorite"
            onClick={handleFavoriteClick}
            aria-label={favorite ? `Quitar ${character.name} de favoritos` : `Añadir ${character.name} a favoritos`}
            aria-pressed={favorite}
          >
            <Favorite type={favorite ? 'fav' : 'nofav'} />
          </button>
        </div>
      </Link>
    </article>
  )
}