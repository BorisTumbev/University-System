import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

export class Login extends Component {
    state = {
        username: "",
        password: ""
    };
    handleSubmit = e => {
        e.preventDefault();
//        this.props.form.validateFields((err, values) => {
//          if (!err) {
//            console.log('Received values of form: ', values);
//          }
//        });
    };

    render() {
//        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                </Form.Item>
                <Form.Item>
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
            </Form>
        );

    }
}

const mapStateToProps = state => ({
//    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { authLogin })(Login);