import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDisciplines } from "../../../actions/discipline";
import { addStudent } from "../../../actions/students";
import {
    Descriptions,
    Badge
} from 'antd';

export class TeacherDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }


    componentDidMount(){

    };

    groups(){
        return this.props.teacher_profile.groups.map(function (e, index){
            return <span key={e.id}> &#183; {e.name}  </span>
        })
    }

    render() {
        const user = this.props
        return (
        <>
            <Descriptions column={5} title="Teacher Info" layout="vertical" bordered>
                <Descriptions.Item label="First Name">{user.first_name}</Descriptions.Item>
                <Descriptions.Item label="Surname">{user.surname}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Faculty">{user.teacher_profile.faculty}</Descriptions.Item>
                <Descriptions.Item label="Groups" span={2}>
                    {this.groups()}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    {user.is_active ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                </Descriptions.Item>
            </Descriptions>
        </>
        );

    }
}

const mapStateToProps = state => ({
//    disciplines: state.discipline_schedule.disciplines
});

function mapDispatchToProps(dispatch) {
    return {
//        getDisciplines: () => dispatch(getDisciplines()),
//        addStudent: (student) => dispatch(addStudent(student)),
  };
}
//const GrForm = Form.create()(GradeForm);
//export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
export default TeacherDetails;
