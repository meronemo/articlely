import { ArticleInput } from "./components/article-input"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3">Articlely</h1>
          <p className="text-muted-foreground text-lg">
          </p>
        </header>

        <ArticleInput />
      </div>
    </main>
  )
}
