export async function GET(req: Request, res: Response) {
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
  console.log(process.env.VERCEL_URL, "process.env.VERCEL_URL");

  let url: string | undefined = "";

  if (process.env.NODE_ENV === "development") {
    url = `${process.env.APP_URL}/api/generatePrompt`;
  }

  if (process.env.NODE_ENV === "production") {
    url = `https://${process.env.VERCEL_URL}/api/generatePrompt`;
  }

  const response = await fetch(url, { cache: "no-store" });
  const textData = await response.text();
  console.log(textData, "textData");
  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
