import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { addDiscSchedule, addDiscipline } from "../../actions/discipline";
import { addGroup } from "../../actions/groups";
import { addMajor } from "../../actions/major";
import { Form, Icon, Input, Button, Checkbox, Menu } from 'antd';
import DisciplineScheduleForm from '../blocks/control_panel/DisciplineScheduleForm';
import DisciplineScheduleTable from '../blocks/control_panel/DisciplineScheduleTable';
import GroupTable from '../blocks/control_panel/GroupTable';
import GroupForm from '../blocks/control_panel/GroupForm';
import DisciplineTable from '../blocks/control_panel/DisciplineTable';
import DisciplineForm from '../blocks/control_panel/DisciplineForm';
import MajorTable from '../blocks/control_panel/MajorTable';
import MajorForm from '../blocks/control_panel/MajorForm';


export class ControlPanel extends Component {
    state = {
        current: 'discipline_schedule',
        showForm: false,
        showGroupForm: false,
        showDiscForm: false,
        showMajorForm: false
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var values_to_post;
                var rrule_end = values.rrule_end._d;
                var end = values.end._d;
                rrule_end.setHours(values.end._d.getHours());
                rrule_end.setMinutes(values.end._d.getMinutes());
                end.setDate(values.start._d.getDate())
                console.log(values);
                values_to_post = {
                    group: values.group,
                    discipline: values.discipline,
                    start: values.start._d,
                    end: end,
                    rrule_end: rrule_end,
                    type_of: values.type
                };
                this.props.addDiscSchedule(values_to_post);

                this.setState({
                    showForm: false,
                });
            }
        });
    };

    handleCancel(e) {
        this.setState({
            showForm: false,
        });
    };

    showForm(){
        this.setState({
            showForm: true,
        });
    }


//    GROUP METHODS

    saveGroupFormRef = groupFormRef => {
        this.groupFormRef = groupFormRef;
    };

    handleGroupOk(e) {
        const { form } = this.groupFormRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.addGroup(values);
                this.setState({
                    showGroupForm: false,
                });
            }
        });
    };

    handleGroupCancel(e) {
        this.setState({
            showGroupForm: false,
        });
    };

    showGroupForm(){
        this.setState({
            showGroupForm: true,
        });
    }


//   END GROUP METHODS

//   DISC METHODS

    saveDiscFormRef = discFormRef => {
        this.discFormRef = discFormRef;
    };

    handleDiscOk(e) {
        const { form } = this.discFormRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.addDiscipline(values);
                this.setState({
                    showDiscForm: false,
                });
            }
        });
    };

    handleDiscCancel(e) {
        this.setState({
            showDiscForm: false,
        });
    };

    showDiscForm(){
        this.setState({
            showDiscForm: true,
        });
    }


//   END DISC METHODS

//  MAJOR METHODS

    showMajorForm(){
        this.setState({
            showMajorForm: true,
        });
    }

    saveMajorFormRef = majorFormRef => {
        this.majorFormRef = majorFormRef;
    };

    handleMajorOk(e) {
        const { form } = this.majorFormRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.addMajor(values);
                this.setState({
                    showMajorForm: false,
                });
            }
        });
    };

    handleMajorCancel(e) {
        this.setState({
            showMajorForm: false,
        });
    };

//  END MAJOR METHODS


    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        var currentForm;
        if(this.state.current === 'discipline_schedule'){
            currentForm = (
                <>
                    <Button type="primary" onClick={(e) => {this.showForm(e)}}>Add Practice</Button>
                    <DisciplineScheduleTable />
                </>
            )
        }
        else if(this.state.current === 'group'){
            currentForm = (
                <>
                    <Button type="primary" onClick={(e) => {this.showGroupForm(e)}}>Add group</Button>
                    <GroupTable />
                </>
            )
        }
        else if(this.state.current === 'discipline'){
            currentForm = (
                <>
                    <Button type="primary" onClick={(e) => {this.showDiscForm(e)}}>Add discipline</Button>
                    <DisciplineTable />
                </>
            )
        }
        else if(this.state.current === 'major'){
            currentForm = (
                <>
                    <Button type="primary" onClick={(e) => {this.showMajorForm(e)}}>Add major</Button>
                    <MajorTable />
                </>
            )
        }


        return (
            <>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="discipline_schedule">
                    <Icon type="mail" />
                    Discipline Schedule
                </Menu.Item>
                <Menu.Item key="group">
                    <Icon type="mail" />
                    Groups
                </Menu.Item>
                <Menu.Item key="discipline">
                    <Icon type="mail" />
                    Disciplines
                </Menu.Item>
                <Menu.Item key="major">
                    <Icon type="mail" />
                    Majors
                </Menu.Item>
            </Menu>
            {currentForm}

            <DisciplineScheduleForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.showForm}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
            />

            <GroupForm
              wrappedComponentRef={this.saveGroupFormRef}
              visible={this.state.showGroupForm}
              onOk={(e) => {this.handleGroupOk(e)}}
              onCancel={(e) => {this.handleGroupCancel(e)}}
            />

            <DisciplineForm
              wrappedComponentRef={this.saveDiscFormRef}
              visible={this.state.showDiscForm}
              onOk={(e) => {this.handleDiscOk(e)}}
              onCancel={(e) => {this.handleDiscCancel(e)}}
            />

            <MajorForm
              wrappedComponentRef={this.saveMajorFormRef}
              visible={this.state.showMajorForm}
              onOk={(e) => {this.handleMajorOk(e)}}
              onCancel={(e) => {this.handleMajorCancel(e)}}
            />

            </>
        );
    }
}


const mapStateToProps = state => ({
//    curr_user: state.auth.user,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
        addDiscSchedule: (obj) => dispatch(addDiscSchedule(obj)),
        addGroup: (group) => dispatch(addGroup(group)),
        addDiscipline: (disc) => dispatch(addDiscipline(disc)),
        addMajor: (major) => dispatch(addMajor(major)),
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
