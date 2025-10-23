"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface ArticleInputProps {
  setArticle: (article: { title: string; content: string }) => void
}

export function ArticleInput({ setArticle }: ArticleInputProps) {
  const [titleInput, setTitleInput] = useState("")
  const [textInput, setTextInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTextSubmit = async () => {
    if (!titleInput.trim() || !textInput.trim()) return
    setError(null)
    setArticle({
      title: titleInput,
      content: textInput,
    })
  }

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return
    
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/fetch-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      })

      const data = await response.json()

      if (data.error || !response.ok) {
        setError(data.error)
        return
      }

      setArticle({
        title: data.title,
        content: data.content,
      })
    } catch (error) {
      setError("Error while fetching: " + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add an Article</CardTitle>
        <CardDescription>Paste text directly or enter a URL to fetch an article</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Paste Text</TabsTrigger>
            <TabsTrigger value="url">Enter URL</TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder="Article title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="min-h-5 resize-none"
            />
            <Textarea
              placeholder="Paste article text here"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[300px] resize-none"
            /> 
            <Button onClick={handleTextSubmit} disabled={!titleInput.trim() || !textInput.trim()} className="w-full">Submit</Button>
          </TabsContent>
          <TabsContent value="url" className="space-y-4">
            <Textarea
              placeholder="Enter a url of an article"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="min-h-5 resize-none"
            />
            <Button onClick={handleUrlSubmit} disabled={!urlInput.trim() || isLoading} className="w-full">
              {isLoading ? "Fetching..." : "Submit"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
