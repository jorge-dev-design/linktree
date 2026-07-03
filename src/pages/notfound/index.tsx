import { Link } from 'react-router-dom'

export function Notfound(){
    return(
        <main className="relative z-[2] flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 text-white">
            <section
                className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
                aria-labelledby="not-found-title"
            >
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-white/75 sm:text-base">
                    Página não encontrada
                </p>

                <h1
                    id="not-found-title"
                    className="text-[clamp(7rem,28vw,15rem)] font-black leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(45,8,86,0.45)]"
                >
                    404
                </h1>

                <p className="mt-8 max-w-lg text-lg font-bold leading-relaxed text-white/90 sm:text-2xl">
                    Este link saiu do ar ou nunca existiu.
                </p>

                <Link
                    to="/"
                    className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 text-base font-black uppercase tracking-wide text-[#2d0856] shadow-[0_8px_0_#2d0856] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_12px_0_#2d0856] active:translate-y-1 active:scale-95 active:shadow-[0_3px_0_#2d0856] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Voltar para a Home
                </Link>
            </section>
        </main>
    )
}
