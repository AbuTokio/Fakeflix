import { Link } from "react-router"

export default function NotFound() {
  return (
    <main className="min-h-[100svh] bg-black px-6 text-slate-200 flex items-center justify-center flex-col">
      <p className=" text-xl font-bold">404</p>
      <h1 className="text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-white">Page not found</h1>
      <p className="mt-4 text-base md:text-lg text-slate-400">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/movies"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-5 font-medium text-white shadow-[0_6px_0_rgba(220,38,38,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_10px_0_rgba(220,38,38,0.3)] focus:outline-none focus:ring-2 focus:ring-red-400">
          Go back home
        </Link>
      </div>
    </main>
  )
}
