import React from "react"
import { Link } from "react-router"

type MovieSectionProps<T> = {
  title: string
  viewAllHref?: string
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  limit?: number
}

// TODO Segment überarbeiten
export default function MovieSection<T>({ title, viewAllHref, items, renderItem, limit }: MovieSectionProps<T>) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items
  return (
    <>
      <section className="space-y-4 w-[90%] m-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {viewAllHref && <Link to={viewAllHref}>View All →</Link>}
        </div>
        <div className="grid grid-cols-4 justify-around">
          {visibleItems.map((item, i) => (
            <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
