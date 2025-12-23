import { useState, ChangeEvent } from 'react'
import './SearchBar.scss'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'SEARCH A CHARACTER...' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="search-bar" role="search">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <label htmlFor="character-search" className="visually-hidden">
        Buscar personaje
      </label>
      <input
        id="character-search"
        className="search-bar__input"
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
