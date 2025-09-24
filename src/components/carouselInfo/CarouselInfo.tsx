import { useResponsive } from "../../hooks/ResponsiveHooks"
import Animation from "../animation/Animation"
import Badge from "../badge/Badge"
import StarRating from "../starRating/StarRating"

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
        <StarRating value={info.rating} />
      </>
    )
  }

  return (
    <>
      <div className="text-white font-nunito min-w-1/2 md:max-w-3/4 flex flex-col gap-2 md:gap-4">
        <Animation delay={0.2}>
          <h2 className="text-xl md:text-4xl font-extrabold">{title}</h2>
        </Animation>
        <Animation delay={0.4}>
          <div className="flex flex-wrap gap-2 md:gap-4 w-full">
            {tags.map((tag, index) => (
              <Badge key={index} hero>
                {tag}
              </Badge>
            ))}
            {bp.isMd && mutedTags()}
          </div>
          {!bp.isMd && <div className="flex">{mutedTags()}</div>}
        </Animation>
        <Animation delay={0.6}>{bp.isMd && <p>{description}</p>}</Animation>
      </div>
    </>
  )
}
