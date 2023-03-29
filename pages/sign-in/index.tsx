import { SignIn } from "@clerk/nextjs/app-beta";
import "@/styles/globals.css";

export default function Page() {
  return (
    <div className="flex w-full h-screen justify-center items-center border">
      <SignIn />
    </div>
  );
}
