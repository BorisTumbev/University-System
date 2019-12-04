import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Students from "./components/pages/Students";
import Teachers from "./components/pages/Teachers";
import Profile from "./components/pages/Profile";
import Survey from "./components/pages/Survey";
import SurveyResolve from "./components/blocks/survey/SurveyResolve";
import Error404 from "./components/pages/404";
import ResetPassword from "./components/pages/ResetPassword";
import ResetPasswordConfirm from "./components/pages/ResetPasswordConfirm";
import ControlPanel from "./components/pages/ControlPanel";


const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/teachers" component={Teachers} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/survey" component={Survey} />
            <Route exact path="/survey/:id" component={SurveyResolve} />
            <Route exact path="/reset-pass" component={ResetPassword} />
            <Route exact path="/reset-pass/:token" component={ResetPasswordConfirm} />
            <Route exact path="/control-panel" component={ControlPanel} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default BaseRouter;