import { Outlet } from "react-router"
import Header from "../../components/header/Header"

export default function Movies() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
