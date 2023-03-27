import Image from "next/image";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <Link href="/">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/4t3"
            alt="Logo"
            width={30}
            height={30}
          />
          <div>
            <h1 className="font-bold">
              The DALLE-2
              <span className="text-violet-500 px-2">AI</span>
              Image generator
            </h1>
            <h2 className="text-xs">
              Powered by DALL-E 2, Chat GPT & Microsoft Azure!
            </h2>
          </div>
        </div>
      </Link>
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link className="px-2 font-light" href="/edit">
          Edit
        </Link>
        <Link className="px-2 font-light" href="/about">
          Link2
        </Link>
      </div>
    </div>
  );
}

export default Header;
