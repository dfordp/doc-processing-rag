import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function Home() {
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
          <div>Please select a document</div>
        </div>
      </div>
    </main>
  );
}
