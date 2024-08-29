import { createEmbeddings } from "@/helpers/chromadb";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from 'path';
import { PdfReader } from "pdfreader";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { _id, fileName } = body;
        const file = path.join(process.cwd(), 'public', fileName);

        const documents = []

        new PdfReader().parseFileItems(file, (err, item) => {
            if (err) console.error("error:", err);
            else if (!item) return;
            else if (item.text) documents.push(item.text);
          });
    

   


        console.log("pre called");

        const embeddings = await createEmbeddings(documents, _id);
        
        if (!embeddings || !Array.isArray(embeddings)) {
            throw new Error("Failed to generate embeddings");
        }

        console.log("post called");
        await fs.unlink(file);


        return NextResponse.json({ status: "success" });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: "error", message: error.message }, { status: 400 });
    }
}

// Helper function to read a file
async function readFile(filePath: string): Promise<string> {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return content;
    } catch (err) {
        throw new Error(`Failed to read file ${filePath}: ${err}`);
    }
}
