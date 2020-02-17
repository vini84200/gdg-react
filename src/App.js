import React from "react";
import "rbx/index.css";
import Header from "./components/Header";
import MocaoPage from "./components/mocao/MocaoPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faPlus,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee, faPlus, faFilePdf);
function App() {
  return (
    <div className="App">
      <Header />
      <MocaoPage />
    </div>
  );
}

export default App;
