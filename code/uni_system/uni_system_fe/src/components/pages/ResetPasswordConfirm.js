import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPasswordConfirm, resetPasswordConfirmGET } from "../../actions/auth";

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


export class ResetPasswordConfirm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        this.props.resetPasswordConfirmGET(this.props.match.params.token);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                console.log(this.props.match.params.token);
                var pass_dict = {
                    password: values.password
                }
                this.props.resetPasswordConfirm(this.props.match.params.token, pass_dict);
                this.props.history.push(`/login`);
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
              labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
              },
              wrapperCol: {
                xs: { span: 16 },
                sm: { span: 8 },
              },
            };
            const tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              },
            };

            var reset_pass_status_code = this.props.reset_pass_status_code



        return (
            <>
            { reset_pass_status_code === 200 ? (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
            </Form>
            ) : (
                 <Result
                    status="warning"
                    title="Invalid Token for password reset."
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
        resetPasswordConfirm: (token, password) => dispatch(resetPasswordConfirm(token, password)),
        resetPasswordConfirmGET: (token) => dispatch(resetPasswordConfirmGET(token)),
  };
}
const RePassConf = Form.create()(ResetPasswordConfirm);
export default connect(mapStateToProps, mapDispatchToProps)(RePassConf);
