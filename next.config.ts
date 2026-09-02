import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  agentRules: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          bypassInlineCode: true,
          defaultLang: {
            block: "text",
          },
          keepBackground: false,
          theme: "github-dark-default",
        },
      ],
    ],
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
