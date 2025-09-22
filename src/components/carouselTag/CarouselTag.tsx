interface CarouselTagProps {
  filled?: boolean
  label?: string
  imgUrl?: string
  className?: string
}

// TODO entfernen und in badge rein

export default function CarouselTag({ filled, label, imgUrl, className }: CarouselTagProps) {
  return (
    <div
      className={`${
        filled ? "bg-white text-black" : "bg-transparent text-white"
      } flex justify-between items-center gap-2 text-lg font-bold font-nunito p-4 rounded-3xl w-fit ${
        className ?? ""
      }`}>
      {imgUrl && <img className="" src={imgUrl} alt={label} />}
      {label}
    </div>
  )
}
