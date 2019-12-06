import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMajors } from "../../../actions/major";
import { addTeacher } from "../../../actions/teachers";
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


export class GroupForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        this.props.getMajors();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
//                var values_to_post = {
//                    teacher_profile: {
//                        groups: values.groups,
//                        faculty: values.faculty,
//                    },
//                    password: values.password,
//                    is_superuser: values.is_superuser,
//                    username: values.username,
//                    first_name: values.first_name,
//                    last_name: values.last_name,
//                    surname: values.surname,
//                    email: values.email
//                }
//                this.props.addTeacher(values_to_post);
            }
        });
    };


    majorOptions(){
        return this.props.majors.map(function (e, index){
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

            <Modal
              title="Group Form"
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
              okText="Submit"
              width= '60%'
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                      {getFieldDecorator('name', {
                        rules: [{ required: true,
                                  message: 'Please input name!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="Major" hasFeedback>
                      {getFieldDecorator('major', {
                        rules: [{ required: true, message: 'Please select major!' }],
                      })(
                        <Select placeholder="Please select a major">
                        {this.majorOptions()}
                        </Select>,
                      )}
                    </Form.Item>
                </Form>
            </Modal>
        );

    }
}

const mapStateToProps = state => ({
    majors: state.major.majors
});

function mapDispatchToProps(dispatch) {
    return {
        getMajors: () => dispatch(getMajors()),
//        addTeacher: (teacher) => dispatch(addTeacher(teacher)),
  };
}
const GrForm = Form.create()(GroupForm);
export default connect(mapStateToProps, mapDispatchToProps)(GrForm);