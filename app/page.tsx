"use client";

import { useState } from "react";
import { ArticleInput } from "./components/article-input";
import { ArticleViewer } from "./components/article-viewer";

export default function Home() {
  const [article, setArticle] = useState<{
    title: string;
    content: string;
  } | null>(null);

  // Show ArticleViewer if article is submitted
  if (article) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Articlely
            </h1>
          </header>
          <ArticleViewer article={article} onBack={() => setArticle(null)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3">Articlely</h1>
          <p className="text-muted-foreground text-lg"></p>
        </header>

        <ArticleInput setArticle={setArticle} />
      </div>
    </main>
  );
}
