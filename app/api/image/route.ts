// Icon generation API route

//TODO store images on s3 and add zod validation

import { NextResponse } from "next/server"
import { env } from "@/env.mjs"
import { auth } from "@clerk/nextjs"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { prompt, amount = 1, resolution = "512x512" } = await req.json()

    console.log("Image", prompt, amount, resolution)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 })
    }

    if (!prompt || !amount || !resolution) {
      return new NextResponse("Something is missing", { status: 400 })
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount),
      size: resolution,
    })

    return NextResponse.json(response.data.data)
  } catch (e) {
    console.log("Image", e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
