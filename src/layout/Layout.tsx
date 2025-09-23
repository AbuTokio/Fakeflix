import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import useScrollToTop from "../utility/Scroll"

export default function Layout() {
  const path = useLocation()
  const noHeader = ["/"]
  useScrollToTop()

  return (
    <>
      {!noHeader.includes(path.pathname) && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  )
}
