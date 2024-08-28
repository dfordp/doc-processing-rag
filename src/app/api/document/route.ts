import client from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(request: Request){
    try {

        const body= await request.json();
        const { name } = body;

        if (!name) {
            return new NextResponse('Missing info', { status: 400 });  
        }

        const document = await client.document.create({
            data: {
              name
            }
          });

          return NextResponse.json(document);

    } catch (error:any) {
        return new NextResponse(error.message, { status: 400 });
    }
}