import React from "react";
import Main from "./screens/Home";
import Manage from "./screens/Manage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Manage} />
        <Route exact path="/reviews/:name" component={Main} />
      </Router>
    </div>
  );
}

export default App;
