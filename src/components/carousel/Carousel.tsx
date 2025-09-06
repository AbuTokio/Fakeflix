import { act, useState } from "react"
import CarouselCard from "../carouselCard/CarouselCard"

const movies = [
  {
    title: "Avatar",
    description:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    tags: ["Science Fiction", "Adventure", "Action"],
    imgUrl: "/src/assets/img/movie-image.png",
  },
  {
    title: "Titanic",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    tags: ["Romance", "Drama"],
    imgUrl: "/src/assets/img/movie-image.png",
  },
  {
    title: "The Godfather",
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    tags: ["Crime", "Drama"],
    imgUrl: "/src/assets/img/movie-image.png",
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    tags: ["Action", "Crime", "Drama"],
    imgUrl: "/src/assets/img/movie-image.png",
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    tags: ["Crime", "Drama"],
    imgUrl: "/src/assets/img/movie-image.png",
  },
]

enum MoveTo {
  NONE = 0,
  LEFT = "moveToLeft",
  RIGHT = "moveToRight",
}

export default function Carousel() {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [moveActiveCard, setMoveActiveCard] = useState<MoveTo>(MoveTo.NONE)

  return (
    <div className="relative w-screen h-fit max-h-[80vh] border overflow-hidden bg-black">
      {movies.map((movie, index) => {
        console.log("previous movie:", movies[activeCard - 1]?.title)
        console.log("current movie:", movies[activeCard].title)
        console.log("next movie:", movies[activeCard + 1]?.title)
        return (
          <div key={index}>
            {index === activeCard && (
              <div
                key={index}
                className={`w-full h-full ${moveActiveCard === MoveTo.RIGHT && "animate-moveToRight"} ${
                  moveActiveCard === MoveTo.LEFT && "animate-moveToLeft"
                }`}>
                <CarouselCard
                  title={movie.title}
                  tags={movie.tags}
                  description={movie.description}
                  imgUrl={movie.imgUrl}
                />
              </div>
            )}

            {activeCard < movies.length - 1 && (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full -translate-x-full ${!moveActiveCard && "hidden"} ${
                  moveActiveCard === MoveTo.RIGHT && "animate-moveFromLeft"
                } ${moveActiveCard === MoveTo.LEFT && "animate-moveFromRight"}`}>
                <CarouselCard
                  title={movies[activeCard + 1].title}
                  tags={movies[activeCard + 1].tags}
                  description={movies[activeCard + 1].description}
                  imgUrl={movies[activeCard + 1].imgUrl}
                />
              </div>
            )}

            {activeCard > 0 && (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full translate-x-full ${!moveActiveCard && "hidden"} ${
                  moveActiveCard === MoveTo.RIGHT && "animate-moveFromLeft"
                } ${moveActiveCard === MoveTo.LEFT && "animate-moveFromRight"}`}>
                <CarouselCard
                  title={movies[activeCard - 1].title}
                  tags={movies[activeCard - 1].tags}
                  description={movies[activeCard - 1].description}
                  imgUrl={movies[activeCard - 1].imgUrl}
                />
              </div>
            )}
          </div>
        )
      })}

      <div className="flex gap-4 absolute bottom-4 left-1/2 -translate-x-1/2 w-fit">
        {movies.map((movie, index) => (
          <div key={index}>
            <div
              className={`w-5 h-5 ${
                activeCard === index ? "w-15 bg-red-600" : "w-5 bg-white cursor-pointer"
              } h-5 rounded-full transition-all duration-150`}
              onClick={() => {
                if (activeCard > index) {
                  setMoveActiveCard(MoveTo.LEFT)
                  act(() => {
                    setTimeout(() => {
                      setActiveCard(index)
                      setMoveActiveCard(MoveTo.NONE)
                    }, 1000)
                  })
                } else if (activeCard < index) {
                  setMoveActiveCard(MoveTo.RIGHT)
                  act(() => {
                    setTimeout(() => {
                      setActiveCard(index)
                      setMoveActiveCard(MoveTo.NONE)
                    }, 1000)
                  })
                }
              }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
