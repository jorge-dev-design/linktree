import { useEffect, useState } from 'react'
import gtaLogo from '../../assets/image/logo.png'

const TARGET_DATE = new Date('2026-11-19T00:00:00-03:00').getTime()

function getTimeLeft() {
  const distance = Math.max(0, TARGET_DATE - Date.now())

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

function formatTime(value: number) {
  return String(value).padStart(2, '0')
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1_000)

    return () => window.clearInterval(interval)
  }, [])

  const units = [
    { label: 'Dias', value: String(timeLeft.days) },
    { label: 'Horas', value: formatTime(timeLeft.hours) },
    { label: 'Minutos', value: formatTime(timeLeft.minutes) },
    { label: 'Segundos', value: formatTime(timeLeft.seconds) },
  ]

  return (
    <section
      className="mt-12 flex w-full flex-col items-center bg-transparent text-center sm:mt-16"
      aria-labelledby="countdown-title"
    >
      <h2
        id="countdown-title"
        className="font-['ArtDeco_Condensed'] text-[clamp(1.35rem,4vw,3.25rem)] font-bold uppercase leading-none tracking-[0.05em] text-white [text-shadow:4px_3px_0_#2d0856]"
      >
        Contagem Regressiva para GTA 6
      </h2>

      <div className="mt-9 grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start sm:mt-12">
        {units.map((unit, index) => (
          <div key={unit.label} className="contents">
            <div className="flex min-w-0 flex-col items-center">
              <strong className="font-['ArtDeco_Condensed'] text-[clamp(2.7rem,8vw,7rem)] font-bold leading-[0.78] tabular-nums tracking-wide text-white [text-shadow:4px_3px_0_#2d0856]">
                {unit.value}
              </strong>
              <span className="mt-4 font-['ArtDeco_Condensed'] text-[clamp(0.58rem,2.2vw,2rem)] font-bold uppercase leading-none tracking-[0.08em] text-white [text-shadow:3px_2px_0_#2d0856] sm:mt-6">
                {unit.label}
              </span>
            </div>

            {index < units.length - 1 && (
              <span
                className="px-1 font-['ArtDeco_Condensed'] text-[clamp(2.3rem,7vw,6rem)] font-bold leading-[0.72] text-white [text-shadow:4px_3px_0_#2d0856] sm:px-3"
                aria-hidden="true"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <img
        src={gtaLogo}
        alt="Grand Theft Auto VI"
        className="mt-12 h-auto w-[clamp(155px,30vw,320px)] object-contain drop-shadow-[0_10px_20px_rgba(45,8,86,0.35)]"
      />
    </section>
  )
}
