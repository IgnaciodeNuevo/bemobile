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
    <div className="search-bar">
      <span className="search-bar__icon">🔍</span>
      <input
        className="search-bar__input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Buscar personaje"
      />
    </div>
  )
}