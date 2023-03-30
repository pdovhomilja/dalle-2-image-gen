import Header from "@/components/Header";
import "../styles/globals.css";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "AI Image generator",
  description:
    "This app use Next.js, TailwindCSS, Prisma and stora data in S3 bucket",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Client provider is to wrap whole app to be able use React hot toast */}
          <ClientProvider>
            {/* Header */}
            <Header />
            {/* Prompt input */}
            <SignedIn>
              <div>{children}</div>
            </SignedIn>
            <SignedOut>
              <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold mb-2">
                    You need to sign in to use this app
                  </h1>
                  <Link
                    className="bg-slate-900 px-5 py-2 text-white rounded-md"
                    href="/sign-in"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </SignedOut>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
