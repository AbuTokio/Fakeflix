export default function Searchbar() {
  return (
    <div className="relative">
      <input
        placeholder="Search..."
        className="input shadow-lg bg-white text-black px-5 py-3 rounded-full w-32 transition-all focus:w-96 outline-none"
        name="search"
        type="text"
      />
      <svg
        className="size-6 absolute top-3 right-3 text-black"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          stroke-linejoin="round"
          stroke-linecap="round"></path>
      </svg>
    </div>
  )
}
