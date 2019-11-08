import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { addStudent } from "../../actions/students";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import StudentForm from '../blocks/students/StudentForm';
import StudentTable from '../blocks/students/StudentTable';


export class Students extends Component {
    constructor(props){
        super(props);

        this.state = {
            showStudentFormAdd: false,
        }
    }
    showStudentFormAdd(){
        this.setState({
            showStudentFormAdd: true,
        });
    }

    handleCancel(e) {
        this.setState({
            showStudentFormAdd: false,
        });
    };

    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
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
                this.setState({
                    showStudentFormAdd: false,
                });
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
        <>
            <Button type="primary" onClick={(e) => {this.showStudentFormAdd(e)}}>Add Student</Button>
            <StudentTable />

            <StudentForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.showStudentFormAdd}
              is_edit={false}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
            />
        </>
        );

    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
        addStudent: (student) => dispatch(addStudent(student)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);