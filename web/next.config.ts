import type { NextConfig } from "next";
export default {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
} satisfies NextConfig;
