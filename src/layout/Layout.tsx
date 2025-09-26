import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import useScrollToTop from "../utility/Scroll"
import Footer from "../components/footer/Footer"
import { useResponsive } from "../hooks/ResponsiveHooks"
import GlobalDialog from "../components/globalDialog/GlobalDialog"
import { Toaster } from "react-hot-toast"

export default function Layout() {
  const path = useLocation()
  const noHeader = ["/"]
  const bp = useResponsive()
  useScrollToTop()

  return (
    <>
      <div className="absolute -top-10 bg-white w-10 h-10 z-999">
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      {!noHeader.includes(path.pathname) && bp.isMd && <Header />}
      <main className={`${!bp.isMd && "mb-[72px]"}`}>
        <Outlet />
      </main>
      {!noHeader.includes(path.pathname) && !bp.isMd && <Footer />}
      <GlobalDialog />
    </>
  )
}
