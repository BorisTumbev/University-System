import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../store";
import BaseRouter from '../routes';
import { HashRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { authCheckState } from '../actions/auth'
import { connect } from "react-redux";


class App extends Component{

    componentDidMount(){
        this.props.authCheckState();
    }

    render(){
        return(

                <Router>
                    <BaseRouter />
                </Router>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authCheckState: () => dispatch(authCheckState()),
  };
}

//ReactDOM.render(<App />, document.getElementById('app'));
export default connect(null, mapDispatchToProps)(App);
