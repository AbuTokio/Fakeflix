import React from "react"
import { Link } from "react-router"

type MovieSectionProps = {
  title: string
  viewAllHref?: string
  children: React.ReactNode
  className?: string
}

export default function MovieSection({ title, viewAllHref, children, className }: MovieSectionProps) {
  return (
    <section className={["mx-auto w-full max-w-screen px-4 sm:px-6 lg:px-8 space-y-4", className || ""].join(" ")}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-red-500  text-lg font-semibold">{title}</h3>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="text-sm font-medium text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded">
            View All →
          </Link>
        )}
      </div>

      {/* Grid */}
      <div
        className="
  grid gap-3 sm:gap-4 justify-center
  [grid-template-columns:repeat(auto-fit,minmax(140px,160px))]
  md:[grid-template-columns:repeat(auto-fit,minmax(180px,220px))]
    lg:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
    xl:[grid-template-columns:repeat(auto-fill,minmax(280px,280px))]
    2xl:[grid-template-columns:repeat(auto-fill,minmax(300px,300px))]
">
        {children}
      </div>
    </section>
  )
}
