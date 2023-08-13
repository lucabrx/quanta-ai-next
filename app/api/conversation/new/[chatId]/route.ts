//ID is generated by the client
// Create a new conversation

import { NextResponse } from "next/server"
import { Conversation } from "@/db/tables"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

interface IParams {
  chatId: string
}
export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const createConversation = await db.insert(Conversation).values({
      id: params.chatId,
      user_id: userId,
    })

    return NextResponse.json("Conversation created")
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
