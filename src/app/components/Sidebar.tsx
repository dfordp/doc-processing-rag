"use client"

import { useRouter } from "next/navigation"
import { IoIosDocument } from "react-icons/io"

const Sidebar = (docs) => {

  const router = useRouter();

  console.log(docs);
  

  return (
    <div className="bg-gray-200 h-screen px-6 py-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Momentum
      </h3>     
      <div className="mt-6 flex flex-col items-center">
      {docs.docs.map((doc, index) => (
        <div onClick={()=>{router.push(`/${doc.id}`)}} key={index} className="flex flex-row items-center scroll-m-20 text-xl font-semibold tracking-tight mt-2 gap-2">
          <div>
            <IoIosDocument />
          </div>
          <div>
            {doc.name}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Sidebar
