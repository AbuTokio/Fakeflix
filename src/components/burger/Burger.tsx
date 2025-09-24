import { useState } from "react"
import { NavLink } from "react-router"
import Searchbar from "../searchbar/Searchbar"

export default function Burger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const menuItems = [{ label: "Genres", to: "/genres" }]

  return (
    <>
      <button onClick={toggleMenu} className="flex flex-col items-center text-sm">
        <svg className="w-8 h-8 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={closeMenu}>
          <div
            className="absolute bottom-18 left-0 right-0 top-50 bg-white shadow-lg rounded-t-lg p-4"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-3">
              <Searchbar />
              <p className="mt-6 text-xl text-black font-bold">See also...</p>
              {menuItems.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.to}
                    onClick={closeMenu}
                    className={(state) =>
                      `block px-3 py-2 rounded-md ${
                        state.isActive ? "bg-red-100 text-red-600" : "text-black hover:bg-red-100"
                      }`
                    }>
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
