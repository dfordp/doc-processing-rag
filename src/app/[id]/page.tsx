import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Chart() {
    return (
        <main className="flex flex-row">
          <div>
            <Sidebar/>
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