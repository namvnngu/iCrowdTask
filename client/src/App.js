import React from "react";
import "./styles/styles.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Requester from "./pages/Requesters";
import Workers from "./pages/Workers";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/requesters" />
        </Route>
        <Route path="/requesters" component={Requester} exact></Route>
        <Route path="/workers" component={Workers} exact></Route>
        <Route path="/task/:id" component={TaskDetail} exact></Route>
      </Switch>
    </div>
  );
}

export default App;
