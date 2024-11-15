import { LINKS } from "@/constants/links";

export const Header = () => {
  return (
    <header className="h-5rem flex align-items-center justify-content-center relative w-screen p-2 color-primary">
      <a className="absolute left-0" href={LINKS.ullHomePage}>
        <img
          className="hidden md:block md:w-15rem ml-2"
          src="./logo-ull.svg"
          alt=""
        />
        <img
          className="h-2rem block md:hidden ml-3"
          src="./ull/icono/icono-ull-blanco.svg"
          alt="Universidad de La Laguna"
        />
      </a>
      <h1 className="text-white text-center text-lg md:text-3xl">
        University Grade Conversion
      </h1>
    </header>
  );
};

