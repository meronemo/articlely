import { NextRequest, NextResponse } from "next/server";
import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return NextResponse.json(
          { error: "URL must start with http:// or https://" },
          { status: 400 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid URL format. Please enter a valid URL" },
        { status: 400 },
      );
    }

    const response = await fetch(url);
    const html = await response.text();

    const dom = parseHTML(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
      return NextResponse.json(
        { error: "Could not parse article" },
        { status: 400 },
      );
    }

    const articleData = {
      title: article.title,
      content: article.textContent,
    };

    return NextResponse.json(articleData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
