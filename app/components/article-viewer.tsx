"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ArticleViewerProps {
  article: {title: string, content: string}
  onBack: () => void
}

export function ArticleViewer({ article, onBack }: ArticleViewerProps) {
  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="outline">
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm">{article.title}</p>
          <p className="whitespace-pre-wrap text-sm">{article.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}
