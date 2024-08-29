import { queryEmbeddings } from "@/helpers/chromadb";
import { conversation } from "@/helpers/grok";
import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try {

        const body= await request.json();
        const { document_id , createdBy , content  } = body;
        
        if ( !document_id || !createdBy ||  !content) {
            return new NextResponse('Missing info', { status: 400 });  
        }

        const message = await client.message.create({
            data: {
                document_id , createdBy , content
            }
          });

        const embeddings = await queryEmbeddings(document_id , message);

        const prompt =  {
            embeddings,
            document_id,
            message
        }

        const promptJsonString = JSON.stringify(prompt);
        
        let messages = await client.document.findMany({
            where : {
                id : document_id
            }
        })
        
        //@ts-ignore
        messages = [...messages , message]

        const botReply = await conversation(messages);

        const botMessage = await client.message.create({
            data : {
                document_id,
                content : botReply || "",
                createdBy : "BOT",
            }
        })

        return NextResponse.json(botMessage);


    } catch (error:any) {
        return new NextResponse(error.message, { status: 400 });
    }
}