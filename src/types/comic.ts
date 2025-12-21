export interface Comic {
  id: number
  name: string | null
  issue_number: string
  cover_date: string | null
  image: {
    medium_url: string
  }
}