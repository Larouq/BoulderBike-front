import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Layout/Header.js"
import Footer from "./Layout/Footer.js"
import Sponsoring from "./Sponsoring"
import Photos from './Photos/Photos.js'
import Location from './Location/Location.js'
import Riders from './Riders/Riders.js'
import "./App.css";

function App() {
  return (
    <Router>
      <Header/>
      <div>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/photos"} component={Photos} />
        <Route exact path={"/location"} component={Location} />
        <Route exact path={"/riders"} component={Riders} />
        <Route exact path={"/sponsoring"} component={Sponsoring} />
      </div>
      <Footer/>
    </Router>
  )
}

export default App;
