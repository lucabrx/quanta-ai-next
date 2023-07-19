import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { env } from '@/env.mjs'
import { db } from '@/lib/db'
import { Message } from '@/db/tables'
import { nanoid } from 'nanoid'

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { message, chatId } = body
    console.log(body)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }

    if (!message) {
      return new NextResponse('Message not provided', { status: 400 })
    }

    await db.insert(Message).values({
      id: nanoid(),
      text: message,
      role: 'user',
      user_id: userId,
      conversation_id: chatId,
    })

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: message }],
    })

    await db.insert(Message).values({
      id: nanoid(),
      text: String(response.data.choices[0].message?.content),
      role: 'bot',
      user_id: userId,
      conversation_id: chatId,
    })

    return NextResponse.json('Message received')
  } catch (e) {
    console.log(e)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
