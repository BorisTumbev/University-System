import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import StudentDetails from '../blocks/students/StudentDetails'


export class Profile extends Component {
    state = {

    };

    componentDidMount(){
        this.props.getUser();
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <StudentDetails {...this.props.curr_user} />
        );

    }
}


const mapStateToProps = state => ({
    curr_user: state.auth.user,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
