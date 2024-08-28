import Groq from "groq-sdk";

const client  = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROK_API_KEY });

const MODEL = 'llama3-groq-70b-8192-tool-use-preview';

export const conversation = async (messages) => {
    const response = await client.chat.completions.create({
        model: MODEL,
        messages: messages,
        tool_choice: "auto",
        max_tokens: 4096
    });

    const responseMessage = response.choices[0].message;

    return responseMessage.content;

}   