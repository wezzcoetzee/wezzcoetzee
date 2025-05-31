export default function Header() {
  return (
    <header className="fixed top-0 p-4 flex justify-between w-full">
      <div className="flex justify-center items-center">
        <h1>Wesley Coetzee</h1>
      </div>
      <div className="flex flex-row gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="black"
          className="w-6 h-6"
        >
          <path
            fill="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        <p>The Hague, Netherlands</p>
      </div>
    </header>
  );
}
