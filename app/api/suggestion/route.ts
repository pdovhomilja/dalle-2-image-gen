export async function GET(req: Request, res: Response) {
  const response = await fetch("http://localhost:3000/api/generatePrompt", {
    cache: "no-store",
  });
  const textData = await response.text();
  console.log(textData, "textData");
  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
