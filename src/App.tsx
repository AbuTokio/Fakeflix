import { Outlet } from "react-router"
import ScrollToTop from "./components/scrollToTop/ScrolltoTop"

function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

export default App
