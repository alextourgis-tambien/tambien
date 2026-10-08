import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token)
    return new Response("Draft preview is not configured.", { status: 503 });
  return defineEnableDraftMode({ client: client.withConfig({ token }) }).GET(
    request,
  );
}
