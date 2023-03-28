import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/openai";
import AWS from "aws-sdk";
import axios from "axios";
import { randomUUID } from "crypto";

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
  const prompt =
    req.body.prompt ||
    "A sci-fi landscape painting in abstract style with vibrant colors, 4K resolution";
  //  return console.log(prompt, "prompt");
  try {
    // Fetch the suggested prompt from the OpenAI API

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

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
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    return;
  }
}
