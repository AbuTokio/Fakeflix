import { useResponsive } from "../../hooks/ResponsiveHooks"
import Badge from "../badge/Badge"

interface CarouselInfoProps {
  title: string
  tags: string[]
  info: { releaseDate: string; rating: number }
  description: string
}

export default function CarouselInfo({ title, tags, info, description }: CarouselInfoProps) {
  const bp = useResponsive()

  const mutedTags = () => {
    return (
      <>
        <Badge muted hero>
          <img src="/img/calendar.svg" alt="calendar" />
          {info.releaseDate}
        </Badge>
        <Badge muted hero>
          <img src="/img/star.svg" alt="star" />
          {info.rating}
        </Badge>
      </>
    )
  }

  return (
    <>
      <div className="text-white font-nunito min-w-1/2 md:max-w-3/4 flex flex-col gap-2 md:gap-4">
        <h2 className="text-xl md:text-4xl font-extrabold">{title}</h2>
        <div className="flex flex-wrap gap-2 md:gap-4 w-full">
          {tags.map((tag, index) => (
            <Badge key={index} hero>
              {tag}
            </Badge>
          ))}
          {bp.isMd && mutedTags()}
        </div>
        {!bp.isMd && <div className="flex">{mutedTags()}</div>}
        {bp.isMd && <p>{description}</p>}
      </div>
    </>
  )
}
