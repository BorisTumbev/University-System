import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import TeacherForm from '../blocks/teachers/TeacherForm';


export class Teachers extends Component {

    render() {
        return (
            <TeacherForm />
        );

    }
}

const mapStateToProps = state => ({
//    isAuthenticated: state.auth.isAuthenticated
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);