import React from "react";
import "rbx/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faPlus,
  faFilePdf,
  faFileExport,
  faFileUpload,
  faList,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import MocaoPage from "./components/mocao/MocaoPage";
import Ata from "./components/atas/Ata";
import PaginaInicial from "./components/PaginaInicial";
import Branco from "./components/branco/Branco";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faList,
  faPlus,
  faFilePdf,
  faFileExport,
  faFileUpload,
  faTrashAlt
);
function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/resolucao">
            <MocaoPage />
          </Route>

          <Route path="/ata">
            <Ata />
          </Route>

          <Route path="/branco">
            <Branco />
          </Route>

          <Route path="/">
            <PaginaInicial />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
