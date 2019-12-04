import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox, Menu } from 'antd';
import DisciplineScheduleForm from '../blocks/control_panel/DisciplineScheduleForm';


export class ControlPanel extends Component {
    state = {
        current: 'discipline_schedule',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };


    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        var currentForm;
        if(this.state.current === 'discipline_schedule'){
            currentForm = <DisciplineScheduleForm />
        }

        return (
            <>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="discipline_schedule">
                    <Icon type="mail" />
                    Discipline Schedule
                </Menu.Item>
                <Menu.Item key="group">
                    <Icon type="mail" />
                    Group
                </Menu.Item>
                <Menu.Item key="discipline">
                    <Icon type="mail" />
                    Discipline
                </Menu.Item>
                <Menu.Item key="major">
                    <Icon type="mail" />
                    Major
                </Menu.Item>
            </Menu>
            {currentForm}
            </>
        );
    }
}


const mapStateToProps = state => ({
//    curr_user: state.auth.user,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
