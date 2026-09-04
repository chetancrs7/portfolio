import { ArticleCard } from "@/components/writing/article-card";
import type { Article } from "@/content/writing";

type RelatedArticlesProps = {
  articles: Article[];
  readingTimes: Record<string, number>;
};

export function RelatedArticles({
  articles,
  readingTimes,
}: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="type-eyebrow text-accent-cyan">Related insights</p>
        <h2 className="type-h3 mt-3">Keep reading</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard
            article={article}
            key={article.slug}
            readingTime={readingTimes[article.slug]}
          />
        ))}
      </div>
    </section>
  );
}
