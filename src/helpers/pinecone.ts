import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { readFile } from "fs/promises";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  model: "text-embedding-3-small",
});

const apiKey: string = process.env.NEXT_PUBLIC_PINECONE_API_KEY || 'default_api_key';

const pinecone = new Pinecone({
  apiKey: apiKey,
});

const pineconeIndex = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX!);

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export const createEmbeddings = async (documentId: string, filePath: string): Promise<void> => {
  try {
    const text = await readFile(filePath, 'utf-8');
    const lines = text.split('\n'); 
    const embedding = await embeddings.embedDocuments(lines);
    await vectorStore.addDocuments([{ id: documentId, embedding }]);
  } catch (error) {
    console.error(`Error creating embedding for "${filePath}": ${error}`);
    throw error;
  }
};


export const queryEmbedding = async (queryString: string): Promise<any[]> => {
  try {
    const result = await vectorStore.similaritySearch(queryString, 1);
    return result.vectors;
  } catch (error) {
    console.error(`Error querying embedding for "${queryString}": ${error}`);
    throw error;
  }
}


export const deleteEmbedding = async (documentId: string): Promise<void> => {
  try {
    await vectorStore.delete(documentId);
    console.log(`Successfully deleted embedding for document ${documentId}`);
  } catch (error) {
    console.error(`Error deleting embedding for document ${documentId}: ${error}`);
  }
}