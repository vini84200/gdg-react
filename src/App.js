import React from 'react';
import 'rbx/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
    faCheckSquare,
    faCoffee,
    faPlus,
    faFilePdf,
    faFileExport,
    faFileUpload,
    faList
} from '@fortawesome/free-solid-svg-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header';
import MocaoPage from './components/mocao/MocaoPage';
import PaginaInicial from './components/PaginaInicial';

library.add(fab, faCheckSquare, faCoffee, faList, faPlus, faFilePdf,faFileExport,faFileUpload);
function App() {
    return (
      <div className="App">
      <Router>
              <Header />
              <Switch>

                <Route path="/resolucao">
                  <MocaoPage />
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
