import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import UniScheduler from '../blocks/home/Scheduler';
import ExamChart from '../blocks/home/ExamChart';
import MainLayout from '../blocks/layouts/MainLayout';

export class Home extends Component {

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        console.log('this.props')
        console.log(this.props)
        return (
            <>
                <MainLayout {...this.props}>
                    <UniScheduler />
                    <ExamChart />
                </MainLayout>
            </>
        );

    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);