import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from 'path';


// Define the POST handler for file uploads
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ status: "fail", error: "No file uploaded" });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const filePath = path.join(process.cwd(), 'public', file.name);
        await fs.writeFile(filePath, buffer);

        revalidatePath("/");

        return NextResponse.json({ status: "success" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}