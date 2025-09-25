// import { Outlet, useLocation } from "react-router"
// ✅ richtig
import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"

export default function Layout() {
  const path = useLocation()
  const noHeader = ["/"]

  return (
    <>
      {!noHeader.includes(path.pathname) && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  )
}
