import { useEffect, useRef } from "react"
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from "react-share"
import NavIcon from "../navIcon/NavIcon"
import toast from "react-hot-toast"

interface ShareDialogProps {
  onClose?: React.ReactEventHandler<HTMLDialogElement> | undefined
}

export default function ShareDialog({ onClose }: ShareDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const iconSize = 32

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }, [])

  return (
    <>
      <dialog
        className="font-nunito place-self-center px-8 pt-16 pb-8 h-fit flex items-start flex-wrap gap-4 bg-gray-900 text-white rounded-2xl border-2"
        ref={dialogRef}
        onClose={onClose}>
        <button
          onClick={() => dialogRef.current?.close()}
          aria-label="Close dialog"
          className="absolute right-3 top-3 z-10 rounded-full font-semibold bg-black/40 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer">
          ✕
        </button>
        <div
          className={`w-8 h-8 bg-black text-white rounded-full content-center justify-center`}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Copied to clipboard!")
            dialogRef.current?.close()
          }}>
          <div className="w-5 mx-auto">
            <NavIcon icon="clipboard" />
          </div>
        </div>
        <EmailIcon size={iconSize} round />
        <FacebookIcon size={iconSize} round />
        <FacebookMessengerIcon size={iconSize} round />
        <XIcon size={iconSize} round />
        <RedditIcon size={iconSize} round />
        <WhatsappIcon size={iconSize} round />
        <TelegramIcon size={iconSize} round />
      </dialog>
    </>
  )
}
