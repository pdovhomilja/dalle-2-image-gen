import ImageGallery from "@/components/ImageGallery";
import { auth } from "@clerk/nextjs/app-beta";
import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";

export default async function Home() {
  const { userId } = auth();
  //console.log(userId, "userId");
  const user: User | null = await currentUser();
  //console.log(user, "user");
  return (
    <main>
      <ImageGallery />
    </main>
  );
}
