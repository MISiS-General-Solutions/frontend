import React from "react";
import {HashRouter as Router, Route, Switch } from "react-router-dom"
import './App.scss';
import CameraMap from "../features/map/CameraMap";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path={"/"} component={CameraMap}/>
      </Router>
    </div>
  );
}

export default App;
