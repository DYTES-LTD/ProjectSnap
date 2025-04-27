
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

export default function App() {


  return (
    <div className="w-full min-h-screen flex flex-col">
      <div>
        <Header/>
      </div>
      
      <main className="flex-1">
        <Outlet />
      </main>

      {/* You can add a footer here if needed */}
    </div>
  );
  // return (
  //   <>
  //     <BrowserRouter>
  //     <Provider store={store}>
  //     <Routes>
  //         <Route path="/" element={<Homepage />} />
  //       </Routes>
  //     </Provider>
  //     </BrowserRouter>
  //   </>
  // );
}
