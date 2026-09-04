import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="technical-background flex min-h-[70vh] items-center">
      <PageContainer className="py-20">
        <div className="max-w-2xl">
          <Badge variant="status">404</Badge>
          <h1 className="type-h1 mt-6 text-balance">
            This route doesn&rsquo;t exist.
          </h1>
          <p className="type-body-lg text-muted-foreground mt-5">
            The page you&rsquo;re looking for isn&rsquo;t here. It may have been
            moved, or the link may be incorrect.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className={buttonVariants()} href="/">
              <ArrowLeft data-icon="inline-start" />
              Back home
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/work"
            >
              View work
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
