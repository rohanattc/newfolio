
export interface Track {
    name: string
    artist: { '#text': string }
    album: { '#text': string }
    image: { '#text': string }[]
    url: string
    '@attr'?: { nowplaying: string }
  }
  
  export async function fetchLatestSong(): Promise<Track | null> {
    try {
      const response = await fetch(
        'https://lastfm-last-played.biancarosa.com.br/rohxnp/latest-song'
      )
      const data = await response.json()
  
      return data.track || null
    } catch (error) {
      console.error('Error fetching latest song:', error)
      return null
    }
  }
  