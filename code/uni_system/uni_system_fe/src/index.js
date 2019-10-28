import App from './components/App';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { Provider } from "react-redux";
import store from "./store";
import axios from 'axios';


var token = localStorage.getItem('token');

if (token != null){
    axios.defaults.headers.common['Authorization'] = 'Token ' + token;
};


const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'));
