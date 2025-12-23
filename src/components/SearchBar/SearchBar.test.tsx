import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('should render with default placeholder', () => {
    render(<SearchBar onSearch={() => {}} />)

    expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument()
  })

  it('should render with custom placeholder', () => {
    render(<SearchBar onSearch={() => {}} placeholder="Custom placeholder" />)

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('should call onSearch when typing', async () => {
    const handleSearch = vi.fn()
    const { user } = render(<SearchBar onSearch={handleSearch} />)

    const input = screen.getByRole('searchbox')
    await user.type(input, 'Spider')

    expect(handleSearch).toHaveBeenCalled()
  })

  it('should have accessible label', () => {
    render(<SearchBar onSearch={() => {}} />)

    expect(screen.getByLabelText('Buscar personaje')).toBeInTheDocument()
  })

  it('should update input value when typing', async () => {
    const { user } = render(<SearchBar onSearch={() => {}} />)

    const input = screen.getByRole('searchbox')
    await user.type(input, 'Batman')

    expect(input).toHaveValue('Batman')
  })
})
