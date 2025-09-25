import { useEffect, useRef } from "react"
import { FacebookIcon, FacebookShareCount } from "react-share"

interface ShareDialogProps {
  onClose?: React.ReactEventHandler<HTMLDialogElement> | undefined
}

export default function ShareDialog({ onClose }: ShareDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }, [])

  return (
    <dialog
      className="font-nunito place-self-center px-16 py-12 h-full w-full flex flex-col justify-between gap-8 bg-black text-white rounded-2xl border-2"
      ref={dialogRef}
      onClose={onClose}>
      <button
        onClick={() => dialogRef.current?.close()}
        aria-label="Close dialog"
        className="absolute right-3 top-3 z-10 rounded-full font-semibold bg-black/40 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer">
        ✕
      </button>
      <FacebookIcon size={32} round />
    </dialog>
  )
}
