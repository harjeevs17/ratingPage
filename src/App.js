import React from "react";
import Main from "./screens/Home";
import Manage from "./screens/Manage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/ratingPage" component={Manage} />
        <Route exact path="/ratingPage/reviews/:name" component={Main} />
      </BrowserRouter>
    </div>
  );
}

export default App;
