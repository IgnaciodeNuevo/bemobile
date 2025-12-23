import { ApiResponse, Character, Comic } from '@/types/index'

const API_URL = '/api'
const API_KEY = import.meta.env.VITE_API_KEY

async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    format: 'json',
    ...params,
  })

  const url = `${API_URL}${endpoint}/?${searchParams}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

export async function getCharacters(limit = 50, offset = 0): Promise<ApiResponse<Character[]>> {
  return fetchApi<ApiResponse<Character[]>>('/characters', {
    limit: String(limit),
    offset: String(offset),
  })
}

export async function searchCharacters(query: string): Promise<ApiResponse<Character[]>> {
  return fetchApi<ApiResponse<Character[]>>('/search', {
    resources: 'character',
    query,
  })
}

export async function getCharacterById(id: number): Promise<ApiResponse<Character>> {
  return fetchApi<ApiResponse<Character>>(`/character/4005-${id}`)
}

export async function getCharacterComics(
  characterId: number,
  limit = 20
): Promise<ApiResponse<Comic[]>> {
  return fetchApi<ApiResponse<Comic[]>>('/issues', {
    limit: String(limit),
    filter: `character:${characterId}`,
    sort: 'cover_date:desc',
  })
}
