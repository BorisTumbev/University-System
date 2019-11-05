import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents } from "../../../actions/students";
import { addGrade } from "../../../actions/grades";
import GradeForm from "./GradeForm"
import StudentDetails from "./StudentDetails"
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

export class StudentTable extends Component {

    constructor(props){
        super(props);

        const columns = [
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'first_name',
                render: (text, record) => <a onClick={(e) => {this.showUserDetail(record)}}>{text}</a>,
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'last_name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Student Num',
                key: 'student_profile',
                render: (text, record) => <p>{record.student_profile.student_num }</p>
            },
            {
                title: "Add Grade",
                key: "add_grade",
                render: (text, record) => (
                    <Button type="primary" onClick={(e) => {this.showGradeForm(record)}}>
                        Add Grade
                    </Button>
                )
            },
            {
                title: "Edit",
                key: "edit",
                render: (text, record) => (
                    <Button type="primary" onClick={(e) => {this.edit(record)}}>
                        Edit
                    </Button>
                )
            },+
        ];


        this.state = {
            table_columns: columns,
            visible: false,
            student: undefined,
        }
    }

    showUserDetail(user){
        this.info(user)
    }

    showGradeForm(record){
        this.setState({
            visible: true,
            student: record
        });
    }

    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values['student'] = this.state.student.student_profile.id
                this.props.addGrade(values);
                this.setState({
                    visible: false,
                });
            }
        });
    };

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    };

    info(user) {
        Modal.info({
        width: '60%',
        title: '',
        content: (
            <StudentDetails {...user}/>
        ),
        onOk() {},
        });
    }

    componentDidMount(){
        this.props.getStudents();
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    edit(record){
        console.log(record);
    }

    render() {

        return (
        <>
            <Table columns={this.state.table_columns} dataSource={this.props.students} pagination={{ pageSize: 25 }}
                    rowKey='id'/>
            <GradeForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
            />
        </>
        );

    }
}

const mapStateToProps = state => ({
    students: state.students.students
});

function mapDispatchToProps(dispatch) {
    return {
        getStudents: () => dispatch(getStudents()),
        addGrade: (grade) => dispatch(addGrade(grade)),
        editStudent: (student) => dispatch(editStudent(student)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);