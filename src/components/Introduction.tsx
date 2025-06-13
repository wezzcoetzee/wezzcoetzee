import Image from "next/image";

export default function Introduction() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
      <div className="relative w-48 h-48 rounded-full overflow-hidden">
        <Image
          src="https://avatars.githubusercontent.com/u/15249642?v=4"
          alt="Wesley Coetzee"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">Wesley Coetzee</h1>
        <h3 className="text-md font-medium">Software Architect and Senior Engineer</h3>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              fill="currentColor"
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
          <p className="text-gray-600 text-sm">The Hague, Netherlands</p>
        </div>
        <p className="text-sm text-gray-600">
          What to learn more about me? Click on the links below.
        </p>
      </div>
    </div>
  );
} 