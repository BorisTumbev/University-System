import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import StudentForm from '../blocks/students/StudentForm';
import StudentTable from '../blocks/students/StudentTable';


export class Students extends Component {

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
        <>
            <StudentForm />
            <StudentTable />
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

export default connect(mapStateToProps, mapDispatchToProps)(Students);