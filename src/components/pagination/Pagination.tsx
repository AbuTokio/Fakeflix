import { useEffect, useState } from "react"
import { useMain } from "../../hooks/ContextHooks"
import NavIcon from "../navIcon/NavIcon"
import { Navigate } from "react-router"

export default function Pagination() {
  const mainCtx = useMain()

  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    if (mainCtx.page > 0) {
      setNavigate(true)
      setTimeout(() => setNavigate(false), 100)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [mainCtx.page])

  return (
    <>
      <div className="text-white px-16 flex items-center justify-center gap-4">
        <div
          className="w-5 cursor-pointer"
          onClick={() => {
            if (mainCtx.page > 1) {
              mainCtx.setPage(mainCtx.page - 1)
            }
          }}>
          <NavIcon icon="left" />
        </div>
        <div>
          {mainCtx.page} / {mainCtx.totalPages}
        </div>
        <div
          className="w-5 cursor-pointer"
          onClick={() => {
            if (mainCtx.page < mainCtx.totalPages) {
              mainCtx.setPage(mainCtx.page + 1)
            }
          }}>
          <NavIcon icon="right" />
        </div>
      </div>
      {navigate && <Navigate to={`?page=${mainCtx.page}`} />}
    </>
  )
}
