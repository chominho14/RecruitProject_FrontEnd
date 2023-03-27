import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./Components/Header";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Header />
        <Outlet />
      </div>
    </RecoilRoot>
  );
}

export default App;
