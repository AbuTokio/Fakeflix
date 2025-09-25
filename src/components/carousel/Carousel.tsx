import React, { act, useEffect, useState } from "react"

interface CarouselProps {
  cards: React.ReactNode[]
}

export default function Carousel({ cards }: CarouselProps) {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [moveActiveCard, setMoveActiveCard] = useState<boolean>(false)

  const switchSlide = () => {
    if (activeCard < cards.length - 1) {
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

  return (
    <div className="relative w-screen h-fit max-h-[80vh] border overflow-hidden bg-black border border-green-600">
      {cards.map((card, index) => {
        return (
          <div key={index}>
            {index === activeCard && (
              <div
                key={index}
                className={`animate-blendin w-full h-full transition-all duration-500 ${
                  moveActiveCard && "animate-blendout"
                }`}>
                {card}
              </div>
            )}
          </div>
        )
      })}

      <div className="flex gap-4 absolute bottom-2 left-1/2 -translate-x-1/2 w-fit p-4">
        {cards.map((card) => (
          <div key={cards.indexOf(card)}>
            <div
              className={`w-1 h-1 ${
                activeCard === cards.indexOf(card) ? "w-15 bg-red-600" : "w-5 bg-white cursor-pointer"
              } md:h-5 rounded-full transition-all duration-150`}
              onClick={() => {
                setMoveActiveCard(true)
                act(() => {
                  setTimeout(() => {
                    setActiveCard(cards.indexOf(card))
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
