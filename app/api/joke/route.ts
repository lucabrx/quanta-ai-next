// JOKE generation API route

import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { env } from '@/env.mjs'

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }

    const msg: ChatCompletionRequestMessage = {
      role: 'user',
      content: 'Tell me a joke',
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [msg],
    })

    return NextResponse.json(response.data.choices[0].message?.content)
  } catch (e) {
    console.log('Image', e)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
