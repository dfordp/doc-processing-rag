import { getDocuments } from "@/actions/document";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default async function Home() {

  const documents = await getDocuments();
  

  return (
    <main className="flex flex-row">
      <div>
        <Sidebar docs = {documents}/>
      </div>
      <div>
        <div>
          <Topbar/>
        </div>
        <div>
          <div>Please select a document</div>
        </div>
      </div>
    </main>
  );
}
