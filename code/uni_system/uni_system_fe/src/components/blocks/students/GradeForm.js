import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDisciplines } from "../../../actions/discipline";
import { addStudent } from "../../../actions/students";
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
  Table,
  Modal
} from 'antd';

const { Option } = Select;

export class GradeForm extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }


    componentDidMount(){
        this.props.getDisciplines();
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

    disciplineOptions(){
        return this.props.disciplines.map(function (e, index){
          return <Option key={e.id} value={e.id}>{e.name}</Option>
        })
    }

    render() {
        const { visible, onCancel, onOk, form } = this.props;
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
              title="Grade"
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
              okText="Add grade"
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Discipline" hasFeedback>
                      {getFieldDecorator('discipline', {
                        rules: [{ required: true, message: 'Please select discipline!' }],
                      })(
                        <Select placeholder="Please select a discipline">
                        {this.disciplineOptions()}
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="Grade">
                      {getFieldDecorator('grade', {
                        initialValue: 2,
                        rules: [{ required: true,
                                  message: 'Please input grade!'
                        }],
                      })(
                        <InputNumber min={2} max={6}/>,
                      )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
        );

    }
}

const mapStateToProps = state => ({
    disciplines: state.discipline_schedule.disciplines
});

function mapDispatchToProps(dispatch) {
    return {
        getDisciplines: () => dispatch(getDisciplines()),
//        addStudent: (student) => dispatch(addStudent(student)),
  };
}
const GrForm = Form.create()(GradeForm);
export default connect(mapStateToProps, mapDispatchToProps)(GrForm);