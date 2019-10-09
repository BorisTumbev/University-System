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
        console.log('vleznaa v logina');
        this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.login(values.email, values.password);
            console.log('Received values of form: ', values);
        }
        });

    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{type: 'email', message: 'The input is not valid E-mail!'},
                                    { required: true, message: 'Please input your E-mail!' }],
                        })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />)}
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

const LoginForm = Form.create()(Login);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null
});

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);