import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from 'path';

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const file = formData.get("file") as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const filePath = path.join(process.cwd(), 'public', file.name);
      await fs.writeFile(filePath, buffer);
      revalidatePath("/");
  
      return NextResponse.json({ status: "success" });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ status: "fail", error: e });
    }
  }