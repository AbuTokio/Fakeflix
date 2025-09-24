import { act, useEffect, useState } from "react"
import CarouselCard from "../carouselCard/CarouselCard"
import { dummyMoviePopular } from "../../dummy/data"

export default function Carousel() {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [moveActiveCard, setMoveActiveCard] = useState<boolean>(false)
  const movies = [...dummyMoviePopular.results.slice(0, 5)]

  const switchSlide = () => {
    if (activeCard < movies.length - 1) {
      setMoveActiveCard(true)
      act(() => {
        setTimeout(() => {
          setActiveCard(activeCard + 1)
          setMoveActiveCard(false)
        }, 600)
      })
    } else {
      setMoveActiveCard(true)
      act(() => {
        setTimeout(() => {
          setActiveCard(0)
          setMoveActiveCard(false)
        }, 600)
      })
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      switchSlide()
    }, 6000)
    return () => clearInterval(intervalId)
  })

  // TODO mit children dynamisch gestalten und in der page mappen

  return (
    <div className="relative w-screen h-fit max-h-[80vh] border overflow-hidden bg-black">
      {movies.map((movie, index) => {
        return (
          <div key={index}>
            {index === activeCard && (
              <div
                key={index}
                className={`animate-blendin w-full h-full transition-all duration-500 ${
                  moveActiveCard && "animate-blendout"
                }`}>
                <CarouselCard movie={movie} />
              </div>
            )}
          </div>
        )
      })}

      <div className="flex gap-4 absolute bottom-2 left-1/2 -translate-x-1/2 w-fit p-2">
        {movies.map((movie, index) => (
          <div key={index}>
            <div
              className={`w-1 h-1 ${
                activeCard === index ? "w-15 bg-red-600" : "w-5 bg-white cursor-pointer"
              } md:h-5 rounded-full transition-all duration-150`}
              onClick={() => {
                setMoveActiveCard(true)
                act(() => {
                  setTimeout(() => {
                    setActiveCard(index)
                    setMoveActiveCard(false)
                  }, 600)
                })
              }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
