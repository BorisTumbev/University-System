import React from "react";
import { Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Students from "./components/pages/Students";
import Teachers from "./components/pages/Teachers";
import Profile from "./components/pages/Profile";
import Survey from "./components/pages/Survey";
import SurveyResolve from "./components/blocks/survey/SurveyResolve";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/students" component={Students} />
    <Route exact path="/teachers" component={Teachers} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/survey" component={Survey} />
    <Route exact path="/survey/:id" component={SurveyResolve} />
  </div>
);

export default BaseRouter;