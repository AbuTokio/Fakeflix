import { useContext } from "react"
import { mainContext } from "../context/MainProvider"

export function useMain() {
  const ctx = useContext(mainContext)
  if (!ctx) throw new Error("useMain must be used within MainProvider")
  return ctx
}
