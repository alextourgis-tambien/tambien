// Run from studio: sanity exec ../web/scripts/update-studio-video.mjs --with-user-token
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "kxrtuoyl",
  dataset: "production",
  apiVersion: "2026-10-08",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const page = await client.fetch(
  '*[_type == "page" && slug.current == "studio" && _id in path("drafts.**")][0]{_id}',
);
if (!page) throw new Error("Studio draft not found");
await client
  .patch(page._id)
  .setIfMissing({
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/1059541602/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=0352dc43b45db1b7622b0dd94ee7529b57700757664b047322d773d29fbbb4e6",
  })
  .commit();
console.log("Studio draft video configured; existing video preserved.");
