import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/Layout/LeftSide";
import NavBar from "./components/Layout/NavBar";
import ProfileCard from "./components/Layout/Profile";
function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full min-h-screen bg-soft-white">
        <SideBar isMobile={false} />

        <main className="flex flex-col flex-1 min-w-0 overflow-y-auto">
          <NavBar />
          <div className="p-4 lg:p-6">
            <ProfileCard />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
