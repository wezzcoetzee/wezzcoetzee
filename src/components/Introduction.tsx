import Image from 'next/image';

export default function Introduction() {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative">
          <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-xl">
            <Image
              src="https://avatars.githubusercontent.com/u/15249642?v=4"
              alt="Wesley Coetzee - Staff Engineer and Tech Lead"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 192px"
            />
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Wesley Coetzee</h1>
            <h2 className="text-xl text-primary font-semibold">
              Staff Engineer and Tech Lead
            </h2>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="p-1.5 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
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
            </div>
            <p className="text-muted-foreground text-base">The Hague, Netherlands</p>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-md">
            Passionate about creating scalable solutions and leading engineering teams. Connect with
            me through the links below to learn more about my work.
          </p>
        </div>
      </div>
    </div>
  );
}
