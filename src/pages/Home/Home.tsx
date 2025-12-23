import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar/index'
import { CharacterCard } from '@/components/CharacterCard/index'
import { getCharacters, searchCharacters } from '@/services/index'
import { useFavorites } from '@/context/index'
import { Character } from '@/types/index'
import './Home.scss'

interface HomeProps {
  showFavorites?: boolean
}

export function Home({ showFavorites = false }: HomeProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { favorites } = useFavorites()

  useEffect(() => {
    if (!showFavorites) {
      loadCharacters()
    }
  }, [showFavorites])

  const loadCharacters = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCharacters(50)
      setCharacters(response.results)
    } catch (err) {
      setError('Error al cargar los personajes')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadCharacters()
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await searchCharacters(query)
      setCharacters(response.results)
    } catch (err) {
      setError('Error al buscar personajes')
    } finally {
      setLoading(false)
    }
  }

  const displayedCharacters = showFavorites ? favorites : characters
  const resultsCount = displayedCharacters.length

  return (
    <>
      {!showFavorites && <SearchBar onSearch={handleSearch} />}
      <main className="main" role="main">
        <h1 className="visually-hidden">
          {showFavorites ? 'Personajes favoritos' : 'Listado de personajes'}
        </h1>
        <p className="results-count" aria-live="polite">
          {showFavorites ? 'FAVORITES' : `${resultsCount} RESULTS`}
        </p>
        {loading && !showFavorites && (
          <p className="loading" role="status">Cargando...</p>
        )}
        {error && (
          <p className="error" role="alert">{error}</p>
        )}
        {(!loading || showFavorites) && !error && (
          <section 
            className="characters-grid" 
            aria-label={showFavorites ? 'Personajes favoritos' : 'Resultados de búsqueda'}
          >
            {displayedCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </section>
        )}
        {showFavorites && resultsCount === 0 && (
          <p className="empty">No tienes personajes favoritos</p>
        )}
      </main>
    </>
  )
}