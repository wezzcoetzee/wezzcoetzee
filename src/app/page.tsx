import SocialCard, { ContactIcon } from "@/components/SocialCard";

export default function Home() {
  const CONTACTS: ContactIcon[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="17.5"
          viewBox="0 0 448 512"
        >
          <path
            fill="black"
            d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
          />
        </svg>
      ),
      link: "https://www.linkedin.com/in/wesleycoetzee/",
      description: "Connect with me professionally and view my work experience",
      name: "linkedin",
      target: "_blank",
    },
    {
      icon: undefined,
      link: "https://cv.wezzcoetzee.com",
      name: "My Online CV",
      description: "View my online CV, you can also download it",
      target: "_blank",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="19.375"
          viewBox="0 0 496 512"
        >
          <path
            fill="black"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      ),
      link: "https://github.com/wezzcoetzee",
      name: "github",
      description: "Check out my open source contributions and personal projects on GitHub",
      target: "_blank",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="25"
          viewBox="0 0 640 512"
        >
          <path
            fill="black"
            d="M180.5 74.3C80.8 74.3 0 155.6 0 256S80.8 437.7 180.5 437.7 361 356.4 361 256 280.2 74.3 180.5 74.3zm288.3 10.6c-49.8 0-90.2 76.6-90.2 171.1s40.4 171.1 90.3 171.1 90.3-76.6 90.3-171.1H559C559 161.5 518.6 84.9 468.8 84.9zm139.5 17.8c-17.5 0-31.7 68.6-31.7 153.3s14.2 153.3 31.7 153.3S640 340.6 640 256C640 171.4 625.8 102.7 608.3 102.7z"
          />
        </svg>
      ),
      link: "https://medium.com/@wezzcoetzee",
      name: "medium",
      description: "Read my technical articles and thoughts on software development",
      target: "_blank",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="15"
          viewBox="0 0 384 512"
        >
          <path
            fill="black"
            d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"
          />
        </svg>
      ),
      link: "https://stackoverflow.com/users/5658060/wesley-coetzee",
      name: "stackoverflow",
      description: "See my contributions to the developer community",
      target: "_blank",
    },
    {
      icon: (
        <svg 
          viewBox="0 0 24 24"     
          height="20"
          width="15"
          xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
        />
      </svg>
      ),
      link: "https://x.com/wezzcoetzee",
      name: undefined,
      description: "Follow me on X, I'm @wezzcoetzee",
      target: "_blank",
    },
  ];

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTACTS.map((contact, index) => (
            <SocialCard
              key={`contact-${index}`}
              contact={contact}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
