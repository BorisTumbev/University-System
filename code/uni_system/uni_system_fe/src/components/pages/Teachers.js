import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import TeacherForm from '../blocks/teachers/TeacherForm';
import TeacherTable from '../blocks/teachers/TeacherTable';
import MainLayout from '../blocks/layouts/MainLayout';


export class Teachers extends Component {

    constructor(props){
        super(props);

        this.state = {
            showTeacherFormAdd: false,
        }
    }

    showTeacherFormAdd(){
        this.setState({
            showTeacherFormAdd: true,
        });
    }


    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var values_to_post = {
                    teacher_profile: {
                        groups: values.groups,
                        faculty: values.faculty,
                    },
                    password: values.password,
                    is_superuser: values.is_superuser,
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    surname: values.surname,
                    email: values.email
                }
                this.props.addTeacher(values_to_post);
                this.setState({
                    showTeacherFormAdd: false,
                });
            }
        });
    };


    handleCancel(e) {
        this.setState({
            showTeacherFormAdd: false,
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
            <MainLayout {...this.props}>
                <Button className='add-btn' type="primary" onClick={(e) => {this.showTeacherFormAdd(e)}}>Add Teacher</Button>
                <TeacherTable />
            </MainLayout>
            <TeacherForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.showTeacherFormAdd}
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
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);