"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ArticleInput() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add an Article</CardTitle>
        <CardDescription>Paste text directly or enter a URL to fetch an article</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Paste Text</TabsTrigger>
            <TabsTrigger value="url">Enter URL</TabsTrigger>
          </TabsList>
          <TabsContent value='text'>

          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
