import { useParams } from "react-router"

export default function GenreDetail() {
  const { name } = useParams()
  return (
    <>
      <h3 className="text-red-500 text-3xl">{name}</h3>
      <div className="text-red-200">MOVIECARD</div>
    </>
  )
}
