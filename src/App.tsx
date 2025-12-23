import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { FavoritesProvider } from '@/context/index'
import { Header } from '@/components/Header/index'
import { Home } from '@/pages/Home/index'
import { CharacterDetail } from '@/pages/CharacterDetail/index'
import './App.css'

function AppContent() {
  const [showFavorites, setShowFavorites] = useState(false)
  const navigate = useNavigate()

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites)
    navigate('/')
  }

  const handleLogoClick = () => {
    setShowFavorites(false)
  }

  return (
    <div className="app">
      <Header onFavoritesClick={handleFavoritesClick} onLogoClick={handleLogoClick} />
      <Routes>
        <Route path="/" element={<Home showFavorites={showFavorites} />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
