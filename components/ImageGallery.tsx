"use client";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "@/lib/fetchImages";
import Link from "next/link";
import { toast } from "react-hot-toast";

function ImageGallery() {
  //Use SWR to fetch images from the API
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate: refreshImages,
  } = useSWR("images", fetchImages, {
    refreshInterval: 5000,
  });

  const imageUrls = data?.message || [];

  const handelDelete = (imageUrl: string) => {
    const notification = toast.loading(`Deleting image ..."`);

    const deleteImage = async (imageUrl: string) => {
      console.log(imageUrl, "imageUrl");
      const res = await fetch("/api/deleteImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      });
      const data = await res.json();

      if (data.message === "success") {
        refreshImages(data);
      }
    };
    deleteImage(imageUrl);

    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success(`Image deleted`, {
        id: notification,
      });
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-wrap w-full justify-center space-x-2 space-y-2">
      <button
        onClick={() => refreshImages(data)}
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
      >
        {isLoading && isValidating ? "Refreshing ... " : "Refresh Images"}
      </button>
      {imageUrls.length === 0 ? (
        <div>There is no images!</div>
      ) : (
        imageUrls.map((imageUrl: string, index: number) => (
          <div key={index} className="flex w-86 items-end justify-end ">
            <Link href={`/image?imageUrl=${imageUrl}`}>
              <Image
                src={imageUrl}
                alt={`Image ${index}`}
                width={400}
                height={400}
              />
            </Link>
            <p
              onClick={() => handelDelete(imageUrl)}
              className=" bg-yellow-300 w-6 h-6 px-2 justify-center items-center cursor-pointer"
            >
              X
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ImageGallery;
