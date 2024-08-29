## Momentum.SH Project

### Project Description

The system consists of two main components:

1. Document Processing Service
2. RAG Chatbot Service

These components work together to provide a seamless experience for users to interact with their document-based knowledge.

### Project Description

- Utlized Next.js for achieving non-functional requirements

- Utlized OpenAI embeddings along with the document upload to handle file conversions and ChromaDB (container is run locally using docker as given below).
 
- API routes: 
 
  - /api/document : handles creation of document instance to the database
  - /api/document/upload : handles the upload of file from form component to the public folder allowing it to be accessed by server action functions
  - /api/document/process = handles conversion of document into embeddings and adding to the the vectorDB chromaDB
  - /api/chat : handles all the chat functionalities of the application based on document  including quering vectorDB, creating bot response , and optimizing the same for the future queries

- Note that the application can only handle .pdf files as of now as each different file type requries a specifc conversion process we couldn't be done in the short span of time given




### How to run the project

Install All the dependencies

```
npm i 
```

Running the project 

```
npm run dev
```


Add Enviroment Variables

```
DATABASE_URL=
NEXT_PUBLIC_GROK_API_KEY = 
NEXT_PUBLIC_OPEN_AI_KEY = 
```

Running ChromaDB VectorDB

```
docker pull chromadb/chroma 
docker run -p 8000:8000 chromadb/chroma
```

