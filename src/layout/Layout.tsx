import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { useResponsive } from "../hooks/ResponsiveHooks"

export default function Layout() {
  const path = useLocation()
  const noHeader = ["/"]
  const bp = useResponsive()

  return (
    <>
      {!noHeader.includes(path.pathname) && bp.isMd && <Header />}
      <main>
        <Outlet />
      </main>
      {!noHeader.includes(path.pathname) && !bp.isMd && <Footer />}
    </>
  )
}
