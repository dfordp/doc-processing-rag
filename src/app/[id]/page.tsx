import { getDocuments } from "@/actions/document";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default async function Chart() {
  

    const documents = await getDocuments();



    return (
        <main className="flex flex-row">
          <div>
            <Sidebar docs={documents}/>
          </div>
          <div>
            <div>
              <Topbar/>
            </div>
            <div>
              <Chat/>
            </div>
          </div>
        </main>
      );
}