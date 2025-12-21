export interface Character {
  id: number
  name: string
  real_name: string | null
  deck: string | null
  description: string | null
  image: {
    medium_url: string
    original_url: string
  }
  api_detail_url: string
}