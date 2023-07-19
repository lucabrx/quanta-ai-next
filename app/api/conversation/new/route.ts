import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Conversation } from '@/db/tables'
import { nanoid } from 'nanoid'

export async function GET() {
  try {
    const convId = nanoid()
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const createConversation = await db.insert(Conversation).values({
      id: convId,
      user_id: userId,
    })

    return NextResponse.json({ conversationId: convId })
  } catch (e) {
    console.log(e)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
