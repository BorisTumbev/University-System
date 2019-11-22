import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import SurveyForm from '../blocks/survey/SurveyForm';
import SurveyTable from '../blocks/survey/SurveyTable';


export class Survey extends Component {

    render() {

        return (
        <>
            <SurveyTable />
            <SurveyForm />
        </>
        );

    }
}

//const LoginForm = Form.create()(Login);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);