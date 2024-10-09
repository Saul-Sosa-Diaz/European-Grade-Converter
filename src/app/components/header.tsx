import {LINKS} from "@/src/app/lib/constants/links";


const Header: React.FC = () => {
  return (
    <header className="flex align-items-center justify-content-center relative sm:w-screen p-2 color-primary">
      <a className="absolute left-0" href={LINKS.ullHomePage}>
        <img className=" w-15rem ml-2" src="./logo-ull.svg" alt="Logo"></img>
      </a>
      <h1 className="text-white text-center">University Grade Conversion</h1>
    </header>
  );
};

export default Header;
