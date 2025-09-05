import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import FakeflixButton from "../../components/startBtn/StartBtn"
import IntroLoader from "../introLoader/IntroLoader"

export default function Home() {
  const [phase, setPhase] = useState<"idle" | "animating">("idle")
  const navigate = useNavigate()

  const handleIntroDone = () => {
    navigate("/movies")
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (phase === "idle" && (event.key === "Enter" || event.key === " ")) {
        setPhase("animating")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase])
  return (
    <>
      <section>
        {phase === "idle" && <FakeflixButton label="Start" onClick={() => setPhase("animating")} />}

        {phase === "animating" && <IntroLoader letter="F" duration={3800} onComplete={handleIntroDone} />}
      </section>
    </>
  )
}
