import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from "@langchain/openai";

const client = new ChromaClient({
    path: "http://localhost:8000"
});

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    model: "text-embedding-3-small",
  });
  

let collectionInstance: any = null;


const getCollection = async () => {
    if (!collectionInstance) {
        collectionInstance = await client.createCollection({ name: "momentum-project" });
    }
    return collectionInstance;
};

const generateEmbeddings = async (documents: string[]) => {
    const embeddingsArray = await embeddings.embedDocuments(documents);
    return embeddingsArray
};

export const createEmbeddings = async (documents, document_id) => {
    try {
        const collection = await getCollection();
        const embeddingsArray = await generateEmbeddings(documents);

        await collection.add({
            documents: documents,
            embeddings: embeddingsArray,
            metadata: {
                document_id: document_id
            }
        });

        console.log("successfully added embeddings");

    } catch (error) {
        console.log("error in creating embeddings", error);
    }
};

export const queryEmbeddings = async (document_id, prompt) => {
    try {
        const collection = await getCollection();
        const queryEmbeddings = await generateEmbeddings(prompt);
        const result = await collection.query({
            queryTexts: [prompt],
            queryEmbeddings: queryEmbeddings
        });

        console.log("successfully queried embeddings");
        console.log(result);

        return result;

    } catch (error) {
        console.log("error in querying embeddings", error);
    }
};