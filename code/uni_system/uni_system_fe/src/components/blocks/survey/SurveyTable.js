import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys } from "../../../actions/survey";
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
                    <Button type="primary" onClick={(e) => {this.showOnHome(record)}}>
                        Show
                    </Button>
                )
            },
            {
                title: "Activate",
                key: "activate",
                render: (text, record) => (
                    <Button type="primary" onClick={(e) => {this.activate(record)}}>
                        Activate
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
            }
        ];


        this.state = {
            table_columns: columns,
            visible: false,
            student: undefined,
            showStudentFormEdit: false,
        }
    }


    componentDidMount(record){
        this.props.getSurveys();
    };

    showOnHome(record){
        console.log('show on home');
        console.log(record);
    }

    edit(record){
        console.log('edit');
        console.log(record);
    }

    activate(record){
        console.log('activate');
        console.log(record);
    }

    render() {

        return (
        <>
            <h1>SURVEYS</h1>
            <Table columns={this.state.table_columns} dataSource={this.props.surveys} pagination={{ pageSize: 25 }}
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
//        addGrade: (grade) => dispatch(addGrade(grade)),
//        editStudent: (student) => dispatch(editStudent(student)),
//        editStudentPut: (student) => dispatch(editStudentPut(student)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(SurveyTable);