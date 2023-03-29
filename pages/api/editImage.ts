import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/openai";
import { randomUUID } from "crypto";
import axios from "axios";
import path from "path";
import AWS from "aws-sdk";
import sharp from "sharp";
import { createReadStream, unlinkSync } from "fs";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new AWS.S3({
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.DO_ACCESS_KEY_SECRET ?? "",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable();

  form.parse(req, async (err, fields, files: any) => {
    if (!files.image) {
      return res.status(400).send("No file uploaded");
    }
    console.log(files.image.filepath, "files.image");

    const fileInput = await sharp(files.image.filepath)
      .toFormat("png")
      .resize(1200, 1200)
      .toFile("final.png");

    const fileTo: any = path.join(process.cwd(), "final.png");

    const stream: any = createReadStream(fileTo);
    const blob = await stream.read();
    //const file = new File([blob], "final.png", { type: "image/png" });

    const response = await openai.createImageVariation(
      stream,
      //   "A sci-fi landscape painting in abstract style with vibrant colors, 4K resolution",
      1,
      "1024x1024"
    );

    //remove final.png file from local store
    await unlinkSync(fileTo);

    const imageUrl = response.data.data[0].url;

    const filename: string = randomUUID() + "_" + Date.now();

    axios({
      url: imageUrl,
      method: "GET",
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        // Upload the image to S3
        s3.upload(
          {
            Bucket: process.env.DO_BUCKET ?? "",
            Key: filename,
            Body: response.data,
            ACL: "public-read",
          },
          (err: any, data: any) => {
            if (err) {
              console.log("Error uploading image to S3:", err);
            } else {
              console.log("Image uploaded to S3:", data.Location);
            }
          }
        );

        return res.status(200).send("Success");
      })
      .catch((error) => {
        console.log("Error downloading image:", error);
      });
  });
}
