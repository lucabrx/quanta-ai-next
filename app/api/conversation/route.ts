
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import {env} from "@/env.mjs";



const configuration = new Configuration({
    apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req:Request){
   try{
       const { userId } = auth();
       const body = await req.json();
         const { messages } = body;
         console.log(body)

       if (!userId) {
           return new NextResponse("Unauthorized", { status: 401 });
       }

       if (!configuration.apiKey) {
           return new NextResponse("OpenAI API Key not configured.", { status: 500 });
       }

       if(!messages){
              return new NextResponse("Messages not provided", { status: 400 });
       }



       const response = await openai.createChatCompletion({
           model: "gpt-3.5-turbo",
           messages: messages,
       });

       return NextResponse.json(response.data.choices[0].message);
   } catch(e) {
       console.log(e);
       return new NextResponse("Internal Error", { status: 500 });
   }



}