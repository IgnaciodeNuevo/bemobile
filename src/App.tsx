import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from '@/components/Header/index'
import { SearchBar } from '@/components/SearchBar/index'
import './App.css'

function App() {
  const handleFavoritesClick = () => {
    console.log('Favorites clicked')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="app">
          <Header onFavoritesClick={handleFavoritesClick} />
          <SearchBar onSearch={handleSearch} />
          <main>
            <h1>Home</h1>
          </main>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App