import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/openai";

type Data = {
  message?: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
      temperature: 0.9,
      max_tokens: 200,
    });
    //console.log(response.data.usage, "response");

    const responseText: any = response.data.choices[0].text;

    console.log(response.data.choices[0].text, "responseText");

    res.status(200).send(responseText?.trim());
    return;
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
