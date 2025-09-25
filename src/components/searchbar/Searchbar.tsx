import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router"

export default function Searchbar() {
  const [navigate, setNavigate] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!navigate && inputRef.current) {
      inputRef.current.value = ""
    }
  }, [navigate])

  const navigateToSearch = () => {
    setNavigate(true)
    setTimeout(() => {
      setNavigate(false)
    }, 100)
  }

  return (
    <>
      <div className="relative">
        <input
          ref={inputRef}
          placeholder="Search..."
          className={`input shadow-lg bg-white text-black px-5 py-3 rounded-full w-full md:w-32 transition-all md:focus:w-96 outline-none`}
          name="search"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputRef.current?.value) {
              navigateToSearch()
            }
          }}
        />
        <button
          onMouseDown={() => {
            if (inputRef.current?.value) {
              navigateToSearch()
            }
          }}>
          <svg
            className="size-6 absolute top-3 right-3 text-black cursor-pointer"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              strokeLinejoin="round"
              strokeLinecap="round"></path>
          </svg>
        </button>
      </div>
      {navigate && inputRef.current && <Navigate to={`/search/${inputRef.current.value}`} />}
    </>
  )
}
