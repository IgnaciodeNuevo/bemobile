import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from '@/components/Header/index'
import { SearchBar } from '@/components/SearchBar/index'
import { CharacterCard } from '@/components/CharacterCard/index'
import { getCharacters, searchCharacters } from '@/services/index'
import { Character } from '@/types/index'
import './App.css'

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCharacters()
  }, [])

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

  const handleFavoritesClick = () => {
    console.log('Favorites clicked')
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

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="app">
          <Header onFavoritesClick={handleFavoritesClick} />
          <SearchBar onSearch={handleSearch} />
          <main className="main">
            <p className="results-count">{characters.length} RESULTS</p>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <div className="characters-grid">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            )}
          </main>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App