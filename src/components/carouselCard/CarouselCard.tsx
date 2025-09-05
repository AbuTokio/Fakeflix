import Button from "../button/Button"
import CarouselInfo from "../carouselInfo/CarouselInfo"

interface CarouselCardProps {
  title: string
  tags: string[]
  description: string
  imgUrl: string
}

export default function CarouselCard({ title, tags, description, imgUrl }: CarouselCardProps) {
  return (
    <>
      <img className="w-full h-full object-cover" src={imgUrl} alt="" />
      <div className="absolute h-full w-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 justify-center items-center">
          <Button filled label="Watch Now" imgUrl="/src/assets/img/play.svg" />
          <Button label="Watch Later" imgUrl="/src/assets/img/clock.svg" />
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-12">
          <CarouselInfo title={title} tags={tags} description={description} />
        </div>
      </div>
    </>
  )
}
