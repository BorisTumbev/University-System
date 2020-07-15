import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import SurveyForm from '../blocks/survey/SurveyForm';
import SurveyTable from '../blocks/survey/SurveyTable';
import MainLayout from '../blocks/layouts/MainLayout'


export class Survey extends Component {

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        var user = {}
        if(this.props.user !== null){
            user = this.props.user
        }

        return (
        <>
            <MainLayout {...this.props}>
                <SurveyTable />
                {user.is_superuser &&
                    <SurveyForm />
                }
            </MainLayout>
        </>
        );

    }
}

//const LoginForm = Form.create()(Login);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null,
    user: state.auth.user
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);