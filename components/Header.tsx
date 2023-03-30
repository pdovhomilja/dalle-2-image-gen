"use client";
import Image from "next/image";
import Link from "next/link";
import { SignUp, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";

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
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
          <Link className="px-2 font-light" href="/edit">
            <p className="btn"> Edit</p>
          </Link>
          <Link className="px-2 font-light" href="/generate">
            <p className="btn"> New images</p>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link className="px-2 font-light" href="/sign-up">
            Sign Up
          </Link>
          <Link className="px-2 font-light" href="/sign-in">
            Sign In
          </Link>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
