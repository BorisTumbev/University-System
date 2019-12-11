import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../../actions/auth";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Switch,
  Modal,
  Result
} from 'antd';

const { Option } = Select;


export class ResetPassword extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.resetPassword(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <>
                { this.props.reset_pass_status_code !== 200 ? (
                    <div className='reset-pass-page'>
                        <Form className="reset-pass-form" onSubmit={this.handleSubmit}>
                            <Form.Item label="E-mail">
                              {getFieldDecorator('email', {
                                rules: [
                                  {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                  },
                                  {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                  },
                                ],
                              })(<Input />)}
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                        </Form>
                    </div>
                ) : (
                  <Result
                    status="success"
                    title="Reset Password email is sent successfully"
                    subTitle="Check your email for the reset link."
                  />
                )}
            </>
        );
    }
}

const mapStateToProps = state => ({
    reset_pass_status_code: state.auth.reset_pass_status_code
});

function mapDispatchToProps(dispatch) {
    return {
        resetPassword: (email) => dispatch(resetPassword(email)),
  };
}

const RePass = Form.create()(ResetPassword);
export default connect(mapStateToProps, mapDispatchToProps)(RePass);
