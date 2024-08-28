import { QdrantClient } from "@qdrant/js-client-rest";
import { AutoModel } from "@huggingface/transformers";
import fs from "node:fs/promises";

const client = new QdrantClient({
    url: process.env.NEXT_PUBLIC_QDRANT_URL,
    apiKey: process.env.NEXT_PUBLIC_QDRANT_API_KEY
});

export const createEmbeddings = async (_id , file) => {
   try {
    
    const model = await AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2");

    const content = await fs.readFile(file, 'utf8');
    const lines = content.split('\n');
    const encodedLines = [];
    for (let i = 0; i < lines.length; i++) {
        const encoded = await model([lines[i]]);
        encodedLines.push({
            id: `${i+1}`,
            documentId: _id,
            vector: encoded[0],
            payload: lines[i]
        });
        await client.upsert("my_collection", { points: encoded });
    }

    console.log(`Documents uploaded successfully to collection 'my_collection'`);

    return {
        success: true,
        message: "Embeddings uploaded successfully",
        collectionName: "my_collection"
    };
    
   } catch (error:any) {
    console.error(`Error uploading documents to collection 'my_collection':`, error);
   }

}


export const queryQdrant  = async( _id) =>{
    try {

        const collectionName = "my_collection";
        //@ts-ignore
        const result = await client.search.vectorSearch({
            collectionName,
            query: {
                documentId: _id
            },
            limit: 10
        });

        if (result.length > 0) {
            return {
                id: result[0].id,
                payload: result[0].payload,
                similarity: result[0].similarity
            };
        } else {
            console.log("No matching document found.");
            return null;
        }
        
    } catch (error:any) {
        console.error(`Error uploading documents to collection 'my_collection':`, error);
    }
}