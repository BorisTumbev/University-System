import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authLogin } from "../../actions/auth";
import { addDiscSchedule } from "../../actions/discipline";
import { Form, Icon, Input, Button, Checkbox, Menu } from 'antd';
import DisciplineScheduleForm from '../blocks/control_panel/DisciplineScheduleForm';
import DisciplineScheduleTable from '../blocks/control_panel/DisciplineScheduleTable';


export class ControlPanel extends Component {
    state = {
        current: 'discipline_schedule',
        showForm: false
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

        return (
            <>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="discipline_schedule">
                    <Icon type="mail" />
                    Discipline Schedule
                </Menu.Item>
                <Menu.Item key="group">
                    <Icon type="mail" />
                    Group
                </Menu.Item>
                <Menu.Item key="discipline">
                    <Icon type="mail" />
                    Discipline
                </Menu.Item>
                <Menu.Item key="major">
                    <Icon type="mail" />
                    Major
                </Menu.Item>
            </Menu>
            {currentForm}

            <DisciplineScheduleForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.showForm}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
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
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
