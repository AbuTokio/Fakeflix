// import { Outlet, useLocation } from "react-router"
// ✅ richtig
import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import useScrollToTop from "../utility/Scroll"
import Footer from "../components/footer/Footer"
import { useResponsive } from "../hooks/ResponsiveHooks"

export default function Layout() {
  const path = useLocation()
  const noHeader = ["/"]
  const bp = useResponsive()
  useScrollToTop()

  return (
    <>
      {!noHeader.includes(path.pathname) && bp.isMd && <Header />}
      <main className={`${!bp.isMd && "mb-[72px]"}`}>
        <Outlet />
      </main>
      {!noHeader.includes(path.pathname) && !bp.isMd && <Footer />}
    </>
  )
}
