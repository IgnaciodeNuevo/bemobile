import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from '@/components/Header/index'
import './App.css'

function App() {
  const handleFavoritesClick = () => {
    console.log('Favorites clicked')
  }

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="app">
          <Header onFavoritesClick={handleFavoritesClick} />
          <main>
            <h1>Home</h1>
          </main>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App