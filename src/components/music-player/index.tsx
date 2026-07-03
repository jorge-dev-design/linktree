import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'

import gtaTheme from '../../assets/mp3/GTA 6 - Official Main Theme Music.mp3'
import hotTogether from '../../assets/mp3/Spaceballs - The Pointer Sisters - Hot Together.mp3'
import loveIsALongRoad from '../../assets/mp3/Tom_Petty_-_Love_Is_A_Long_Road_(mp3.pm).mp3'

const tracks = [
  {
    title: 'GTA 6 - Official Main Theme Music',
    artist: 'Rockstar Games',
    src: gtaTheme,
  },
  {
    title: 'Hot Together',
    artist: 'The Pointer Sisters',
    src: hotTogether,
  },
  {
    title: 'Love Is a Long Road',
    artist: 'Tom Petty',
    src: loveIsALongRoad,
  },
]

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const shouldResumeRef = useRef(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = tracks[trackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.load()
    setCurrentTime(0)
    setDuration(0)

    if (shouldResumeRef.current) {
      void audio.play().catch(() => setIsPlaying(false))
    }
  }, [trackIndex])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  const changeTrack = (direction: number) => {
    const audio = audioRef.current
    shouldResumeRef.current = Boolean(audio && !audio.paused)
    setTrackIndex((current) => (current + direction + tracks.length) % tracks.length)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  const seek = (value: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value
    setCurrentTime(value)
  }

  return (
    <section className="music-player" aria-label="Player de música">
      <div className={`sound-bars ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} style={{ '--bar-index': index } as CSSProperties} />
        ))}
      </div>

      <p className="music-player__label">TOCANDO AGORA</p>
      <h1>{currentTrack.title}</h1>
      <p className="music-player__artist">{currentTrack.artist}</p>

      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        muted={isMuted}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />

      <div className="music-player__timeline">
        <input
          aria-label="Progresso da música"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(Number(event.target.value))}
          style={{ '--progress': `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties}
        />
        <div className="music-player__time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-player__controls">
        <button type="button" onClick={() => changeTrack(-1)} aria-label="Música anterior">
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>

        <button
          className="music-player__play"
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>

        <button type="button" onClick={() => changeTrack(1)} aria-label="Próxima música">
          <FontAwesomeIcon icon={faForwardStep} />
        </button>

        <button
          className="music-player__mute"
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </button>
      </div>

      <div className="music-player__track-count" aria-label={`Faixa ${trackIndex + 1} de ${tracks.length}`}>
        {tracks.map((track, index) => (
          <span key={track.title} className={index === trackIndex ? 'is-active' : ''} />
        ))}
      </div>
    </section>
  )
}
