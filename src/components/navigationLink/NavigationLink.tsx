import { NavLink } from "react-router"

interface NavigationLinkProps {
  label: string
  to: string
}

export default function NavigationLink({ label, to }: NavigationLinkProps) {
  return (
    <NavLink
      className={(state) =>
        `p-2 ${
          state.isActive &&
          "relative after:absolute after:w-1 after:h-1 after:rounded-full after:bg-red-600 after:bottom-0.5 after:left-1/2 after:-translate-x-1/2"
        }`
      }
      to={to}>
      {label}
    </NavLink>
  )
}
