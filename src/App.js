import React from "react";
import Main from "./screens/Home";
import Manage from "./screens/Manage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/reviews/:name" component={Main} />
        <Route exact path="/manage" component={Manage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
