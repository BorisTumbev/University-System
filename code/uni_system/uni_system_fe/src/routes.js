import React from "react";
import { Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";

const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
  </div>
);

export default BaseRouter;