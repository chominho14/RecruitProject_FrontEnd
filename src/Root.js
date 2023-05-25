import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Header from "./Components/Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <Outlet />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
