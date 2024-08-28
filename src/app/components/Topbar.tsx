"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"


const Topbar = () => {

  const [name,setName] = useState("");
  const [file,setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {


      const data = {
        "name" : name
      }

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }

      //upload file to backend
      const upload = await axios.post('/api/document/upload',formData,{
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      })

      console.log(upload.data);
      

      
      const doc = await axios.post(`/api/document`,data);
      
      console.log(doc.data);

      const fileName = file?.name;

      const embedding = {
        "_id" : doc.data._id,
        "fileName" : fileName
      }
      const createEmbeddings = await axios.post('/api/document/process',embedding);

      console.log(createEmbeddings.data);
      
      
    
    } catch (error:any) {
      console.log(error.message, { status: 400 });
    }
  }

  return (
    <div className="my-2 ml-2">
      <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          Add Doc
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Document For Processing</DialogTitle>
          <div className="mt-2">
            <div className="mt-4">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                File Name
              </h3>
              <Input value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="mt-4">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                File
              </h3>
              <Input 
              type="file" 
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  //@ts-ignore
                  setFile(files[0]);
                } else {
                  setFile(null);
                }
              }}
            />
            </div>
            <div className="mt-4 flex flex-row justify-center">
              <Button variant="outline" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        </div>
  )
}

export default Topbar
