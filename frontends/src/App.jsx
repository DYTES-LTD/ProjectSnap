import { Provider } from "react-redux";
import Userhome from "./Components1/Userhome";
import Home from "./Components1/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Store } from "lucide-react";
import store from "./store/store";
import React from "react";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
      <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
      </BrowserRouter>
    </>
  );
}
