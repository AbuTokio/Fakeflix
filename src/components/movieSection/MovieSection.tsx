import React from "react"
import { Link } from "react-router"
import Animation from "../animation/Animation"

type MovieSectionProps = {
  title: string
  viewAllHref?: string
  children: React.ReactNode
  className?: string
  grid?: boolean
  titleClassName?: string
}

export default function MovieSection({
  title,
  viewAllHref,
  children,
  className,
  grid = false,
  titleClassName = "",
}: MovieSectionProps) {
  return (
    <>
      <Animation delay={0.2}>
        <section className={["mx-auto w-full max-w-screen px-4 sm:px-6 lg:px-8 space-y-4", className || ""].join(" ")}>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className={[
                "text-white font-semibold leading-tight",
                "text-base sm:text-lg lg:text-xl xl:text-2xl",
                "line-clamp-2 sm:line-clamp-1",
                titleClassName || "",
              ].join(" ")}
              title={title}>
              {title}
            </h3>
            {viewAllHref && (
              <Link
                to={viewAllHref}
                aria-label="View all"
                className={[
                  "inline-flex items-center justify-center gap-1 rounded",
                  "text-white/90 hover:text-red-400",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
                  "text-sm sm:text-base",
                  "py-1.5 px-2.5 sm:py-2 sm:px-3",
                  "self-start sm:self-auto",
                ].join(" ")}>
                View All
              </Link>
            )}
          </div>

          {/* Grid */}
          <Animation delay={0.5}>
            <div
              className={
                grid
                  ? `
                  grid gap-3 sm:gap-4 justify-center
                  [grid-template-columns:repeat(auto-fit,minmax(140px,150px))]
                  md:[grid-template-columns:repeat(auto-fit,minmax(180px,220px))]
                  lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]
                  xl:[grid-template-columns:repeat(auto-fill,minmax(280px,280px))]
                  2xl:[grid-template-columns:repeat(auto-fill,minmax(300px,300px))]
                `
                  : ""
              }>
              {children}
            </div>
          </Animation>
        </section>
      </Animation>
    </>
  )
}
