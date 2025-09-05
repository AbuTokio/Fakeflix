interface CarouselTagProps {
  filled?: boolean
  label?: string
  imgUrl?: string
}

export default function CarouselTag({ filled, label, imgUrl }: CarouselTagProps) {
  return (
    <div
      className={`${
        filled ? "bg-white text-black" : "bg-transparent text-white"
      } flex justify-between items-center gap-2 text-lg font-bold font-nunito p-4 rounded-3xl w-fit`}>
      {imgUrl && <img className="" src={imgUrl} alt={label} />}
      {label}
    </div>
  )
}
