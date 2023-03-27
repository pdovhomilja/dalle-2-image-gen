"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FileUploadForm from "@//components/FileUploadForm";

type Props = {};

const ImageDetail = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <FileUploadForm />
      <Link
        href="/"
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
      >
        Back to home
      </Link>
    </div>
  );
};

export default ImageDetail;
