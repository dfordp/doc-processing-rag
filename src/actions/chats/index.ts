
import client from "@/lib/prismadb"

export const getChatsById = async (_id) => {
    const result = await client.document.findMany({
        where : {
            id : _id
        }
    });
    const documents = result; 
    console.log(documents);
    
    return documents;
}