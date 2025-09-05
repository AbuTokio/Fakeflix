import NavigationLink from "../navigationLink/NavigationLink"
import Searchbar from "../searchbar/Searchbar"

export default function Header() {
  return (
    <header className="bg-black text-white px-12 py-4">
      <nav className="flex justify-between items-center font-nunito">
        <p className="font-bebasneue text-4xl text-red-600 select-none">Fakeflix</p>
        <div className="flex justify-center items-center gap-4">
          <NavigationLink label="Home" to="/movies" />
          <NavigationLink label="Genre" to="/genres" />
          <Searchbar />
          <NavigationLink label="Country" to="/countries" />
          <NavigationLink label="Random" to="/random" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <NavigationLink label="Login" to="/login" />
          <img src="/src/assets/img/bell.svg" alt="notifications" />
        </div>
      </nav>
    </header>
  )
}
