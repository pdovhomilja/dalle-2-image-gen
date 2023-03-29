import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import AWS from "aws-sdk";

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
  const imageUrl = req.body.url;
  console.log(imageUrl, "imageUrl");
  const filename: string = imageUrl.split("/").pop();
  axios({
    url: imageUrl,
    method: "GET",
    responseType: "arraybuffer",
  })
    .then(async (response) => {
      // Upload the image to S3
      s3.deleteObject(
        {
          Bucket: process.env.DO_BUCKET ?? "",
          Key: filename,
        },
        (err: any, data: any) => {
          if (err) {
            console.log("Error uploading image to S3:", err);
          } else {
            console.log("Image deleted from S3");
          }
        }
      );

      return res.status(200).send("Object successfully deleted from S3");
    })
    .catch((error) => {
      console.log("Error downloading image:", error);
    });
}
