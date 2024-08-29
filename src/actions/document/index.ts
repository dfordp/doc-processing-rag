"use server"

import client from "@/lib/prismadb"

export const getDocuments = async () => {
    const result = await client.document.findMany({});
    const documents = result; 
    console.log(documents);
    
    return documents;
}