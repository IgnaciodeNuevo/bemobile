import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCharacterById, getCharacterComics } from '@/services/index'
import { useFavorites } from '@/context/index'
import { Favorite } from '@/components/Favorite/index'
import { Character, Comic } from '@/types/index'
import './CharacterDetail.scss'

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>()
  const [character, setCharacter] = useState<Character | null>(null)
  const [comics, setComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    if (id) {
      loadCharacter(Number(id))
    }
  }, [id])

  const loadCharacter = async (characterId: number) => {
    try {
      setLoading(true)
      setError(null)
      const [characterResponse, comicsResponse] = await Promise.all([
        getCharacterById(characterId),
        getCharacterComics(characterId, 20),
      ])
      setCharacter(characterResponse.results)
      setComics(comicsResponse.results)
    } catch {
      setError('Error al cargar el personaje')
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteClick = () => {
    if (!character) return

    if (isFavorite(character.id)) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  if (loading) {
    return (
      <p className="loading" role="status">
        Cargando...
      </p>
    )
  }

  if (error || !character) {
    return (
      <p className="error" role="alert">
        {error || 'Personaje no encontrado'}
      </p>
    )
  }

  const favorite = isFavorite(character.id)

  return (
    <main className="character-detail" role="main">
      <article aria-labelledby="character-name">
        <section className="character-detail__hero">
          <div className="character-detail__hero-container">
            <div className="character-detail__image">
              <img src={character.image.original_url} alt={`Imagen de ${character.name}`} />
            </div>
            <div className="character-detail__info">
              <div className="character-detail__header">
                <h1 id="character-name" className="character-detail__name">
                  {character.name}
                </h1>
                <button
                  className="character-detail__favorite"
                  onClick={handleFavoriteClick}
                  aria-label={
                    favorite
                      ? `Quitar ${character.name} de favoritos`
                      : `Añadir ${character.name} a favoritos`
                  }
                  aria-pressed={favorite}
                >
                  <Favorite type={favorite ? 'fav' : 'nofav'} />
                </button>
              </div>
              {character.deck && <p className="character-detail__deck">{character.deck}</p>}
            </div>
          </div>
        </section>

        {comics.length > 0 && (
          <section className="character-detail__comics" aria-labelledby="comics-title">
            <h2 id="comics-title" className="character-detail__comics-title">
              Comics
            </h2>
            <ul className="character-detail__comics-list" role="list">
              {comics.map(comic => (
                <li key={comic.id} className="comic-card">
                  <img
                    className="comic-card__image"
                    src={comic.image.medium_url}
                    alt={`Portada de ${comic.name || `Issue #${comic.issue_number}`}`}
                  />
                  <p className="comic-card__title">
                    {comic.name || `Issue #${comic.issue_number}`}
                  </p>
                  {comic.cover_date && (
                    <p className="comic-card__date">
                      <time dateTime={comic.cover_date}>
                        {new Date(comic.cover_date).getFullYear()}
                      </time>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  )
}
