import { ListObjectsCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "@/lib/s3client";

type Data = {
  message?: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const bucketParams = { Bucket: process.env.DO_BUCKET };
    const data: any = await s3Client.send(new ListObjectsCommand(bucketParams));

    const imageUrls = data.Contents.map((content: any) => {
      const imageUrl = `https://ai-image-blob.fra1.digitaloceanspaces.com/${content.Key}`;
      return imageUrl;
    });

    //console.log("Success", imageUrls);

    const imageUrl_sorted = imageUrls.sort((a: any, b: any) => {
      const aName = a.split("_").pop().toString().split(".").shift();
      const bName = b.split("_").pop().toString().split(".").shift();
      return bName - aName;
    });
    res.status(200).json({ message: imageUrl_sorted });

    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
