import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../store";
import BaseRouter from '../routes';
import { HashRouter as Router } from 'react-router-dom';


class App extends Component{
    render(){

        return(
            <Provider store={store}>
                <Router>
                    <BaseRouter />
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));