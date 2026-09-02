import type { MDXComponents } from "mdx/types";

import { usePortfolioMDXComponents } from "@/components/mdx/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return usePortfolioMDXComponents(components);
}
