import Header from "@/components/Header";
import "../styles/globals.css";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: "AI Image generator",
  description:
    "This app use Next.js, TailwindCSS, Prisma and stora data in S3 bucket",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Client provider is to wrap whole app to be able use React hot toast */}
        <ClientProvider>
          {/* Header */}
          <Header />
          {/* Prompt input */}
          <PromptInput />
          <div>{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
