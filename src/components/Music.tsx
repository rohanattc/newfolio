import React, { useEffect, useState } from 'react'
import { fetchLatestSong, type Track } from '../lib/music'

export default function Music() {
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestSong()
      .then((data) => setTrack(data))
      .catch(() => setTrack(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Loading music...</p>
  }

  if (!track) {
    return <p>Something absolutely horrible has gone wrong</p>
  }

  return (
    <div className="relative font-[offbit] flex h-full w-full flex-col items-start justify-between gap-4 p-2 md:flex-row md:items-center">
      <div className="relative flex h-full w-full flex-row items-start justify-between gap-4">
        <img
          src={track.image[3]['#text']}
          alt="Album art"
          width={64}
          height={64}
          className="mb-2 w-20 max-w-20 rounded-xl border border-border grayscale md:w-full"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-end overflow-hidden">
          <div className="flex flex-col">
            <span className="mb-2 flex gap-2">
              <span className="text-sm text-primary">
                {track['@attr']?.nowplaying === 'true' ? 'Now playing...' : 'Last played...'}
              </span>
            </span>
            <span className="mb-2 truncate text-lg font-bold leading-none">{track.name}</span>
            <span className="w-[85%] truncate text-sm text-muted-foreground">
              <span className="font-semibold text-secondary-foreground">by</span> {track.artist['#text']}
            </span>
            <span className="w-[85%] truncate text-sm text-muted-foreground">
              <span className="font-semibold text-secondary-foreground">on</span> {track.album['#text']}
            </span>
          </div>
        </div>
      </div>
      <a
        href={track.url}
        aria-label="View on last.fm"
        title="View on last.fm"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 m-0 flex w-fit items-end rounded-full border bg-secondary/50 p-3 text-primary transition-all duration-300 hover:rotate-12 hover:ring-1 hover:ring-primary"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9995 2.03029C19.0163 1.47826 18.5823 1.01719 18.0303 1.00046L9.03442 0.727856C8.48239 0.711128 8.02132 1.14508 8.00459 1.69711C7.98786 2.24914 8.42181 2.71021 8.97384 2.72694L16.9702 2.96925L16.7279 10.9656C16.7111 11.5176 17.1451 11.9787 17.6971 11.9954C18.2491 12.0121 18.7102 11.5782 18.7269 11.0262L18.9995 2.03029ZM1.68536 18.7282L18.6854 2.7282L17.3146 1.2718L0.314635 17.2718L1.68536 18.7282Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  )
}
