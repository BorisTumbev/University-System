import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroups } from "../../../actions/groups";
import { addStudent, changeIsEditFalse, editStudentPut } from "../../../actions/students";
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
  Modal
} from 'antd';

const { Option } = Select;


export class StudentForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        this.props.getGroups();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var values_to_post = {
                    student_profile: {
                        qualification_type: values.qualification_type,
                        group: values.group,
                        faculty: values.faculty,
                        semester: values.semester
                    },
                    password: values.password,
                    is_superuser: values.is_superuser,
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    surname: values.surname,
                    email: values.email
                }
                this.props.addStudent(values_to_post);
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

    groupsOptions(){
        return this.props.groups.map(function (e, index){
          return <Option key={e.id} value={e.id}>{e.name}</Option>
        })
    }

    render() {

        const { visible, is_edit, onCancel, onOk, form } = this.props;
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
        return (
        <>
            <Modal
              title="Student Form"
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
              okText="Submit"
              width= '60%'
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                    <Form.Item label="Username">
                      {getFieldDecorator('username', {
                        rules: [{ required: true,
                                  message: 'Please input your username!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="First Name">
                      {getFieldDecorator('first_name', {
                        rules: [{ required: true,
                                  message: 'Please input your first name!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="Surname">
                      {getFieldDecorator('surname', {
                        rules: [{ required: true,
                                  message: 'Please input your surname!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                      {getFieldDecorator('last_name', {
                        rules: [{ required: true,
                                  message: 'Please input your last name!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="Group" hasFeedback>
                      {getFieldDecorator('group', {
                        rules: [{ required: true, message: 'Please select group!' }],
                      })(
                        <Select placeholder="Please select a group">
                        {this.groupsOptions()}
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="Qualification Type" hasFeedback>
                      {getFieldDecorator('qualification_type', {
                        rules: [{ required: true, message: 'Please select qualification type!' }],
                      })(
                        <Select placeholder="Please select a qualification type">
                          <Option value="BD">Bachelor degree</Option>
                          <Option value="MD">Master degree</Option>
                          <Option value="PHD">Doctorate</Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="Faculty" hasFeedback>
                      {getFieldDecorator('faculty', {
                        rules: [{ required: true, message: 'Please select faculty!' }],
                      })(
                        <Select placeholder="Please select a faculty">
                          <Option value="FEA">FEA</Option>
                          <Option value="FMU">FMU</Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="Semester">
                      {getFieldDecorator('semester', {
                        initialValue: 1,
                        rules: [{ required: true,
                                  message: 'Please input semester!'
                        }],
                      })(
                        <InputNumber min={1} max={8}/>,
                      )}
                    </Form.Item>
                    {!is_edit &&
                        <>
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
                        </>
                    }
                    <Form.Item label="Admin">
                      {getFieldDecorator('is_superuser', { valuePropName: 'checked',  initialValue: false, })(<Switch />)}
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );

    }
}

const mapStateToProps = state => ({
    groups: state.groups.groups,
//    is_edit: state.students.is_edit,
    student: state.students.student,
});

function mapDispatchToProps(dispatch) {
    return {
        getGroups: () => dispatch(getGroups()),
        addStudent: (student) => dispatch(addStudent(student)),
        editStudentPut: (student) => dispatch(editStudentPut(student)),
        changeIsEditFalse: () => dispatch(changeIsEditFalse()),
  };
}
const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(StForm);

//                    <Form.Item {...tailFormItemLayout}>
//                      <Button type="primary" htmlType="submit">
//                        Add Student
//                      </Button>
//                    </Form.Item>