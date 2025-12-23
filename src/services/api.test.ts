import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCharacters, searchCharacters, getCharacterById, getCharacterComics } from './api'

const mockCharacter = {
  id: 1,
  name: 'Spider-Man',
  real_name: 'Peter Parker',
  deck: 'Hero from New York',
  description: 'Bitten by a spider',
  image: { medium_url: 'http://image.url', original_url: 'http://image.url' },
  api_detail_url: 'http://api.url',
}

const mockComic = {
  id: 100,
  name: 'Amazing Spider-Man',
  issue_number: '1',
  cover_date: '2020-01-01',
  image: { medium_url: 'http://comic.url' },
}

const mockApiResponse = <T>(results: T) => ({
  error: 'OK',
  limit: 50,
  offset: 0,
  number_of_page_results: 1,
  number_of_total_results: 1,
  status_code: 1,
  results,
})

describe('API Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getCharacters', () => {
    it('should fetch characters with default params', async () => {
      const mockResponse = mockApiResponse([mockCharacter])
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await getCharacters()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/characters/?')
      )
      expect(result.results).toHaveLength(1)
      expect(result.results[0].name).toBe('Spider-Man')
    })

    it('should fetch characters with custom limit and offset', async () => {
      const mockResponse = mockApiResponse([mockCharacter])
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      await getCharacters(10, 20)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/limit=10/)
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/offset=20/)
      )
    })

    it('should throw error when response is not ok', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })

      await expect(getCharacters()).rejects.toThrow('API Error: 500')
    })
  })

  describe('searchCharacters', () => {
    it('should search characters by query', async () => {
      const mockResponse = mockApiResponse([mockCharacter])
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await searchCharacters('Spider')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/search/?')
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/query=Spider/)
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/resources=character/)
      )
      expect(result.results[0].name).toBe('Spider-Man')
    })
  })

  describe('getCharacterById', () => {
    it('should fetch a single character by id', async () => {
      const mockResponse = mockApiResponse(mockCharacter)
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await getCharacterById(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/character/4005-1/?')
      )
      expect(result.results.name).toBe('Spider-Man')
    })
  })

  describe('getCharacterComics', () => {
    it('should fetch comics for a character', async () => {
      const mockResponse = mockApiResponse([mockComic])
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await getCharacterComics(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/issues/?')
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/filter=character%3A1/)
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/limit=20/)
      )
      expect(result.results[0].name).toBe('Amazing Spider-Man')
    })

    it('should fetch comics with custom limit', async () => {
      const mockResponse = mockApiResponse([mockComic])
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      await getCharacterComics(1, 10)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/limit=10/)
      )
    })
  })
})