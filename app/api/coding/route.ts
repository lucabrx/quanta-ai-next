// Adding title to conversation
// Sending message to OpenAI
// Saving response to database
// Sending all messages to OpenAI from db

// TODO zod validation

import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from 'openai'
import { env } from '@/env.mjs'
import { db } from '@/lib/db'
import { Coding, CodingResponse, Conversation } from '@/db/tables'
import { nanoid } from 'nanoid'
import { asc, eq } from 'drizzle-orm'

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
})

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

const openai = new OpenAIApi(configuration)
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { message, codeId } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }
    if (!message) {
      return new NextResponse('Message not provided', { status: 400 })
    }

    const chat = await db.select().from(Coding).where(eq(Coding.id, codeId))

    const coding = chat[0]

    if (coding.title?.length === undefined) {
      await db
        .update(Coding)
        .set({ title: message.slice(0, 15) })
        .where(eq(Coding.id, codeId))
    }

    await db.insert(CodingResponse).values({
      id: nanoid(),
      text: message,
      role: 'user',
      user_id: userId,
      coding_id: codeId,
    })

    const chats = await db
      .select()
      .from(CodingResponse)
      .where(eq(CodingResponse.coding_id, codeId))
      .orderBy(asc(CodingResponse.created_at))

    let messagesArr: ChatCompletionRequestMessage[] = []

    for (let i = 0; i < chats.length; i++) {
      messagesArr.push({
        role: chats[i].role,
        content: String(chats[i].text),
      })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messagesArr],
    })

    await db.insert(CodingResponse).values({
      id: nanoid(),
      text: String(response.data.choices[0].message?.content),
      role: 'system',
      user_id: userId,
      coding_id: codeId,
    })

    return NextResponse.json('Message received')
  } catch (e) {
    console.log(e)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
