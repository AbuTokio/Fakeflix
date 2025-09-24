interface ButtonProps {
  filled?: boolean
  label?: string
  imgUrl?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({ filled, label, imgUrl, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        filled
          ? "bg-red-600 text-white active:bg-gray-100/80 active:text-red-600"
          : "bg-gray-100/80 text-red-600  active:bg-red-600 active:text-white"
      } text-xs md:text-xl font-bold font-nunito px-4 py-2 md:p-4 flex justify-between items-center gap-2 rounded-md active:opacity-70 cursor-pointer whitespace-nowrap`}>
      {label}
      {imgUrl && <img className="w-3 h-3 md:w-5 md:h-5" src={imgUrl} alt={label} />}
    </button>
  )
}
