interface ButtonProps {
  filled?: boolean
  label?: string
  imgUrl?: string
}

export default function Button({ filled, label, imgUrl }: ButtonProps) {
  return (
    <button
      className={`${
        filled ? "bg-red-600" : "bg-transparent border-2 border-red-600"
      } text-white text-xl font-bold font-nunito p-4 flex justify-between items-center gap-2 rounded-md active:opacity-80 cursor-pointer`}>
      {label}
      {imgUrl && <img className="" src={imgUrl} alt={label} />}
    </button>
  )
}
