import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  agentRules: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug"],
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
