import { createEmbeddings } from "@/helpers/Qdrant";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from 'path';

export async function POST(request: Request){
    try {
        const body= await request.json();
        const { _id , fileName} = body;
        const file = path.join(process.cwd(), 'public', fileName );

        console.log("pre called");
        

        const embeddings = await createEmbeddings(_id,file);
        console.log(embeddings);
        

        console.log("post called");

        return NextResponse.json({ status: "success" });

    } catch (error:any) {
        return new NextResponse(error.message, { status: 400 });
    }
}