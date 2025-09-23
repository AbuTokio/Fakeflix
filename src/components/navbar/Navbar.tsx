import { useResponsive } from "../../hooks/ResponsiveHooks"
import Burger from "../burger/Burger"
import NavigationLink from "../navigationLink/NavigationLink"
import Searchbar from "../searchbar/Searchbar"

export default function Navbar() {
  const bp = useResponsive()

  return (
    <nav className="px-16 py-4 w-full flex justify-center items-center font-nunito bg-black text-white md:justify-between md:p-4">
      {bp.isMd && <p className="font-bebasneue text-4xl text-red-600 select-none">Fakeflix</p>}
      <div className="flex justify-center items-center gap-4">
        {/* TODO routes anpassen */}
        <NavigationLink icon={!bp.isMd ? "home" : null} label="Home" to="/movies" />
        <NavigationLink icon={!bp.isMd ? "watchlist" : null} label={bp.isMd ? "Watchlist" : ""} to="/watchlist" />
        {!bp.isMd && (
          <>
            <NavigationLink icon="login" to="/login" />
            <Burger />
          </>
        )}
        {bp.isMd && (
          <>
            <Searchbar />
            <NavigationLink label="Genres" to="/countries" />
            <NavigationLink label="Random" to="/random" />
          </>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {bp.isMd && (
          <>
            <NavigationLink label="Login" to="/login" />
            <img src="/img/bell.svg" alt="notifications" />
          </>
        )}
      </div>
    </nav>
  )
}

// <nav className="flex justify-between items-center font-nunito">
//   <p className="font-bebasneue text-4xl text-red-600 select-none">Fakeflix</p>
//   <div className="flex justify-center items-center gap-4">
//     {/* TODO routes anpassen */}
//     <NavigationLink label="Home" to="/movies" />
//     <NavigationLink label="Genre" to="/genres" />
//     <Searchbar />
//     <NavigationLink label="Country" to="/countries" />
//     <NavigationLink label="Random" to="/random" />
//   </div>
//   <div className="flex justify-center items-center gap-4">
//     <NavigationLink label="Login" to="/login" />
//     <img src="/src/assets/img/bell.svg" alt="notifications" />
//   </div>
// </nav>
