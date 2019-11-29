import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents, editStudent, editStudentPut } from "../../../actions/students";
import { addGrade } from "../../../actions/grades";
import GradeForm from "./GradeForm"
import StudentDetails from "./StudentDetails"
import StudentForm from './StudentForm';
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
import Highlighter from 'react-highlight-words';
import {recompose} from '../../../utils';
const { Option } = Select;


export class StudentTable extends Component {

    constructor(props){
        super(props);

        this.state = {
//            table_columns: columns,
            visible: false,
            student: undefined,
            showStudentFormEdit: false,
            searchText: '',
            searchedColumn: '',
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

    handleStOk(e) {
        const { form } = this.formStRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var values_to_post = {
                    id: this.state.student.id,
                    student_profile: {
                        qualification_type: values.qualification_type,
                        group: values.group,
                        faculty: values.faculty,
                        semester: values.semester
                    },
                    is_superuser: values.is_superuser,
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    surname: values.surname,
                    email: values.email
                }
                this.props.editStudentPut(values_to_post);
                this.setState({
                    showStudentFormEdit: false,
                });
            }
        });
    };

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    };

    handleStCancel(e) {
        this.setState({
            showStudentFormEdit: false,
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

    saveStFormRef = formStRef => {
        this.formStRef = formStRef;
    };

    edit(record){
        const { form } = this.formStRef.props;
        form.setFieldsValue({
            email: record.email,
            username: record.username,
            first_name: record.first_name,
            surname: record.surname,
            last_name: record.last_name,
            group: record.student_profile.group.id,
            qualification_type: record.student_profile.qualification_type,
            faculty: record.student_profile.faculty,
            semester: record.student_profile.semester,
            is_superuser: record.is_superuser,
        })
//        this.props.editStudent(record);
        console.log(record);
        this.setState({
            showStudentFormEdit: true,
            student: record,
        });
    }

    getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${title}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            recompose(record, dataIndex).toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex) ?
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            : text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {

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
                ...this.getColumnSearchProps('last_name', 'Last Name'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email', 'Email'),
            },
            {
                title: 'Student Num',
                dataIndex: 'student_profile.student_num',
                key: 'student_profile',
                render: (text, record) => <p>{record.student_profile.student_num }</p>,
                ...this.getColumnSearchProps('student_profile.student_num', 'Student Num'),
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
            }
        ];


        return (
        <>
            <Table columns={columns} dataSource={this.props.students} pagination={{ pageSize: 25 }}
                    rowKey='id'/>
            <GradeForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onOk={(e) => {this.handleOk(e)}}
              onCancel={(e) => {this.handleCancel(e)}}
            />
            <StudentForm
              wrappedComponentRef={this.saveStFormRef}
              visible={this.state.showStudentFormEdit}
              is_edit={true}
              onOk={(e) => {this.handleStOk(e)}}
              onCancel={(e) => {this.handleStCancel(e)}}
            />
        </>
        );
    }
}

const mapStateToProps = state => ({
    students: state.students.students,
    groups: state.groups.groups,
});

function mapDispatchToProps(dispatch) {
    return {
        getStudents: () => dispatch(getStudents()),
        addGrade: (grade) => dispatch(addGrade(grade)),
        editStudent: (student) => dispatch(editStudent(student)),
        editStudentPut: (student) => dispatch(editStudentPut(student)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);