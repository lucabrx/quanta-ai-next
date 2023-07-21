// Get all conversations
//TODO add pagination or infinite query

import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Conversation } from '@/db/tables'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }
    const data = await db
      .select()
      .from(Conversation)
      .orderBy(desc(Conversation.created_at))
      .where(eq(Conversation.user_id, userId))

    return NextResponse.json(data)
  } catch (e) {
    console.log(e, 'error get-all/route.ts')
    return NextResponse.json('Something went wrong')
  }
}
