import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTeachers, editTeacher } from "../../../actions/teachers";
import TeacherForm from './TeacherForm'
import TeacherDetails from './TeacherDetails'
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

export class TeacherTable extends Component {

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
                title: "Edit",
                key: "edit",
                render: (text, record) => (
                    <Button type="primary" onClick={(e) => {this.edit(record)}}>
                        Edit
                    </Button>
                )
            }
        ];


        this.state = {
            table_columns: columns,
            visible: false,
            teacher: undefined,
            showTeacherFormEdit: false,
        }
    }

    showUserDetail(user){
        this.info(user)
    }


    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('valuess0')
                console.log(values)
                var values_to_post = {
                    id: this.state.teacher.id,
                    teacher_profile: {
                        groups: values.groups,
                        faculty: values.faculty,
                    },
                    is_superuser: values.is_superuser,
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    surname: values.surname,
                    email: values.email
                }
                this.props.editTeacher(values_to_post);
                this.setState({
                    showTeacherFormEdit: false,
                });
            }
        });
    };

    handleCancel(e) {
        this.setState({
            showTeacherFormEdit: false,
        });
    };

    info(user) {
        Modal.info({
        width: '60%',
        title: '',
        content: (
            <TeacherDetails {...user}/>
        ),
        onOk() {},
        });
    }

    componentDidMount(){
        this.props.getTeachers();
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    edit(record){
        const { form } = this.formRef.props;
        var groups_ids = [];
        record.teacher_profile.groups.map(function(g, index){
            groups_ids.push(g.id);
        });
        form.setFieldsValue({
            email: record.email,
            username: record.username,
            first_name: record.first_name,
            surname: record.surname,
            last_name: record.last_name,
            groups: groups_ids,
            faculty: record.teacher_profile.faculty,
            is_superuser: record.is_superuser,
        })
        console.log(record);
        this.setState({
            showTeacherFormEdit: true,
            teacher: record,
        });
    }

    render() {

        return (
        <>
            <Table columns={this.state.table_columns} dataSource={this.props.teachers} pagination={{ pageSize: 25 }}
                    rowKey='id'/>

            <TeacherForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.showTeacherFormEdit}
              is_edit={true}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
            />
        </>
        );
    }
}

const mapStateToProps = state => ({
    teachers: state.teachers.teachers,
//    groups: state.groups.groups,
});

function mapDispatchToProps(dispatch) {
    return {
        getTeachers: () => dispatch(getTeachers()),
        editTeacher: (teacher) => dispatch(editTeacher(teacher)),
//        editStudent: (student) => dispatch(editStudent(student)),
//        editStudentPut: (student) => dispatch(editStudentPut(student)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(TeacherTable);