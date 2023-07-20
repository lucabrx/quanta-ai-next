import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai'
import { env } from '@/env.mjs'
import { db } from '@/lib/db'
import { Conversation, Message } from '@/db/tables'
import { nanoid } from 'nanoid'
import {asc, eq} from 'drizzle-orm'

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { message, chatId } = body

    console.log("this is server body: ", body)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }

    if (!message) {
      return new NextResponse('Message not provided', { status: 400 })
    }

    const chat = await db
      .select()
      .from(Conversation)
      .where(eq(Conversation.id, chatId))

    const conversation = chat[0]

    if (conversation.title?.length === undefined) {
      await db
        .update(Conversation)
        .set({ title: message.slice(0, 15) })
        .where(eq(Conversation.id, chatId))
    }

    await db.insert(Message).values({
      id: nanoid(),
      text: message,
      role: 'user',
      user_id: userId,
      conversation_id: chatId,
    })

    const chats = await db
        .select()
        .from(Message)
        .where(eq(Message.conversation_id, chatId))
        .orderBy(asc(Message.created_at))

    let messagesArr :ChatCompletionRequestMessage[] = []

    for (let i = 0; i < chats.length; i++) {

        messagesArr.push({
          role: chats[i].role,
          content: String(chats[i].text),
        })
    }

    console.log("this is messagesArr: ", messagesArr)

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messagesArr,
    })

    await db.insert(Message).values({
      id: nanoid(),
      text: String(response.data.choices[0].message?.content),
      role: 'system',
      user_id: userId,
      conversation_id: chatId,
    })

    return NextResponse.json('Message received')
  } catch (e) {
    console.log(e)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
