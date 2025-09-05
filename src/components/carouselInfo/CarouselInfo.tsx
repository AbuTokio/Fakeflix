import CarouselTag from "../carouselTag/CarouselTag"

interface CarouselInfoProps {
  title: string
  tags: string[]
  description: string
}

export default function CarouselInfo({ title, tags, description }: CarouselInfoProps) {
  return (
    <>
      <div className="text-white font-nunito min-w-1/2 max-w-3/4 flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <div className="flex gap-4 w-full">
          {tags.map((tag, index) => (
            <CarouselTag key={index} filled label={tag} />
          ))}
          <CarouselTag label="2022" imgUrl="/src/assets/img/calendar.svg" />
          <CarouselTag label="3:12:00" imgUrl="/src/assets/img/duration.svg" />
          <CarouselTag label="8.5" imgUrl="/src/assets/img/star.svg" />
        </div>
        <p>{description}</p>
      </div>
    </>
  )
}
