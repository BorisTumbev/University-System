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

export class StudentDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }


    componentDidMount(){

    };

    grades(){
        return this.props.grades.map(function (e, index){
            return <div key={e.id}> &#183; {e.discipline.name} : {e.grade} - {e.created} </div>
        })
    }

    render() {
        const user = this.props
        return (
        <>
            <Descriptions column={4} title="Student Info" layout="vertical" bordered>
                <Descriptions.Item label="First Name">{user.first_name}</Descriptions.Item>
                <Descriptions.Item label="Surname">{user.surname}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Faculty">{user.student_profile.faculty}</Descriptions.Item>
                <Descriptions.Item label="Group">{user.student_profile.group.name}</Descriptions.Item>
                <Descriptions.Item label="Major">{user.student_profile.group.major.name}</Descriptions.Item>
                <Descriptions.Item label="Qualification Type">{user.student_profile.qualification_type}</Descriptions.Item>
                <Descriptions.Item label="Semester">{user.student_profile.semester}</Descriptions.Item>
                <Descriptions.Item label="Student Number">{user.student_profile.student_num}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                    {user.is_active ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                </Descriptions.Item>
                <Descriptions.Item label="Grades">
                    {this.grades()}
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
export default StudentDetails;
