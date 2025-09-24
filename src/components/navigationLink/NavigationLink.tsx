import { NavLink } from "react-router"
import NavIcon from "../navIcon/NavIcon"
import { useResponsive } from "../../hooks/ResponsiveHooks"

interface NavigationLinkProps {
  label?: string
  icon?: "home" | "watchlist" | "login" | null
  to: string
}

export default function NavigationLink({ label, icon, to }: NavigationLinkProps) {
  const bp = useResponsive()

  return (
    <NavLink
      className={(state) =>
        `p-2 flex gap-2 ${
          state.isActive &&
          "text-red-600 md:text-white md:relative md:after:absolute md:after:w-1 md:after:h-1 md:after:rounded-full md:after:bg-red-600 md:after:bottom-0.5 md:after:left-1/2 md:after:-translate-x-1/2 text-"
        }`
      }
      to={to}>
      {({ isActive }) => (
        <>
          {icon && <NavIcon icon={icon} />}
          {!bp.isMd && isActive && label && label}
          {bp.isMd && label && label}
        </>
      )}
    </NavLink>
  )
}
