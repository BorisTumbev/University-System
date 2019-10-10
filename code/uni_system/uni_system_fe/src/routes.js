import React from "react";
import { Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Students from "./components/pages/Students";
import Teachers from "./components/pages/Teachers";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/students" component={Students} />
    <Route exact path="/teachers" component={Teachers} />
  </div>
);

export default BaseRouter;