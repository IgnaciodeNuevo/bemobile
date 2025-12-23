import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Character } from '@/types'

interface FavoritesContextType {
  favorites: Character[]
  addFavorite: (character: Character) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

const STORAGE_KEY = 'bemobile_favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (character: Character) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === character.id)) {
        return prev
      }
      return [...prev, character]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
