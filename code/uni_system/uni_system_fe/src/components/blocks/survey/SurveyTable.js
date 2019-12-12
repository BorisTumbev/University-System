import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys, editSurvey } from "../../../actions/survey";
import { sendSurveyEmail } from "../../../actions/email";
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

export class SurveyTable extends Component {

    constructor(props){
        super(props);

        this.state = {
//            table_columns: columns,
            visible: false,
            student: undefined,
            showStudentFormEdit: false,
        }
    }


    componentDidMount(record){
        this.props.getSurveys();
    };

    showOnHome(record){
        console.log('show on homeez');
        console.log(record);
        record.is_on_home = true;
        this.props.editSurvey(record);
    }

    edit(record){
        console.log('edit');
        console.log(record);
    }

    activate(record){
        console.log('activate');
        console.log(record);
        record.is_active = true;
        this.props.editSurvey(record);
    }

    send_emails(record){
        console.log('send-emails');
        console.log(record);
//        record.is_active = true;
        this.props.sendSurveyEmail(record.major.id, record.id);
    }


    render() {
        console.log('vlezna v renderzzz');
        console.log(this.props.surveys);
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
//                render: (text, record) => <a onClick={(e) => {this.showUserDetail(record)}}>{text}</a>,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Major',
                key: 'major',
                render: (text, record) => <p>{record.major.name}</p>
            },
            {
                title: "Show on home page",
                key: "show",
                render: (text, record) => (
                    <Button className='surveyShow' type={record.is_on_home ? 'primary' : 'danger'} onClick={(e) => {this.showOnHome(record)}}>
                        Show
                    </Button>
                )
            },
            {
                title: "Activate",
                key: "activate",
                render: (text, record) => (
                    <Button type={record.is_active ? 'primary' : 'danger'} onClick={(e) => {this.activate(record)}}>
                        Activate
                    </Button>
                )
            },
            {
                title: "Send Emails",
                key: "send_emails",
                render: (text, record) => (
                    <Button type='primary' onClick={(e) => {this.send_emails(record)}}>
                        Send
                    </Button>
                )
            },
            {
                title: "Edit",
                key: "edit",
                render: (text, record) => (
                    <Button disabled type="primary" onClick={(e) => {this.edit(record)}}>
                        Edit
                    </Button>
                )
            }
        ];

        return (
        <>
            <h1>SURVEYS</h1>
            <Table columns={columns} dataSource={this.props.surveys} pagination={{ pageSize: 25 }}
                    rowKey='id'/>
        </>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.survey.surveys,
//    groups: state.groups.groups,
});

function mapDispatchToProps(dispatch) {
    return {
        getSurveys: () => dispatch(getSurveys()),
        sendSurveyEmail: (major_id, survey_id) => dispatch(sendSurveyEmail(major_id, survey_id)),
        editSurvey: (survey) => dispatch(editSurvey(survey)),
//        editStudentPut: (student) => dispatch(editStudentPut(student)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(SurveyTable);