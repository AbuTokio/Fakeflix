import { useEffect, useState } from "react"
import LoginCard from "../../components/loginCard/LoginCard"
import { useMain } from "../../hooks/ContextHooks"

export default function Login() {
  const mainCtx = useMain()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (mainCtx.user) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
      {mainCtx.user && loggedIn ? (
        <p className="absolute top-1/2 -translate-y-1/2 text-center w-full text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-white">
          Hello {mainCtx.user.name}, you are already logged in!
        </p>
      ) : (
        <div className="h-[calc(100vh-72px)] md:h-[calc(100vh-112px)] grid place-items-center">
          <LoginCard />
        </div>
      )}
    </>
  )
}
