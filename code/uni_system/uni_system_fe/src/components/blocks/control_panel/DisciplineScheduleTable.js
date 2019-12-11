import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents, editStudent, editStudentPut } from "../../../actions/students";
import { getDiscModelSchedule, editDiscModelSchedule, addDiscSchedule } from "../../../actions/discipline";
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
import moment from 'moment';
import DisciplineScheduleForm from './DisciplineScheduleForm';
const { Option } = Select;


export class DisciplineScheduleTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            searchText: '',
            searchedColumn: '',
            sched_obj: {}
        }
    }


    componentDidMount(){
        this.props.getDiscModelSchedule();
    };


    edit(record){
        const { form } = this.formRef.props;

        form.setFieldsValue({
            group: record.group.id,
            type: record.type_of,
            start: moment(record.start),
            end: moment(record.end),
            rrule_end: moment(record.rrule_end),
            discipline: record.discipline.id,
        })
//        this.props.editStudent(record);

        this.setState({
            showForm: true,
            sched_obj: record,
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
                    id: this.state.sched_obj.id,
                    group: values.group,
                    discipline: values.discipline,
                    start: values.start._d,
                    end: end,
                    rrule_end: rrule_end,
                    type_of: values.type
                };
                this.props.editDiscModelSchedule(values_to_post);

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


    render() {

        const columns = [
            {
                title: 'Group',
                dataIndex: 'group.name',
                key: 'group',
                render: (text, record) => <p>{record.group.name }</p>,
                ...this.getColumnSearchProps('group.name', 'Group'),
            },
            {
                title: 'Discipline',
                dataIndex: 'discipline.name',
                key: 'discipline',
                render: (text, record) => <p>{record.discipline.name }</p>,
                ...this.getColumnSearchProps('discipline.name', 'Discipline'),
            },
            {
                title: 'Type',
                dataIndex: 'type_of',
                key: 'type_of',
                ...this.getColumnSearchProps('type_of', 'Type'),
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
//                render: (text, record) => <p>{record.student_profile.student_num }</p>,
                ...this.getColumnSearchProps('start', 'Start'),
            },
           {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
//                render: (text, record) => <p>{record.student_profile.student_num }</p>,
                ...this.getColumnSearchProps('end', 'End'),
            },
           {
                title: 'Whole practice end',
                dataIndex: 'rrule_end',
                key: 'rrule_end',
//                render: (text, record) => <p>{record.student_profile.student_num }</p>,
                ...this.getColumnSearchProps('rrule_end', 'End of whole practice'),
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
            <Table className='contr-panel-tbl' columns={columns} dataSource={this.props.discipline_model_schedule} pagination={{ pageSize: 10 }}
                    rowKey='id'/>

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
    discipline_model_schedule: state.discipline_schedule.discipline_model_schedule,
});

function mapDispatchToProps(dispatch) {
    return {
        getDiscModelSchedule: () => dispatch(getDiscModelSchedule()),
        editDiscModelSchedule: (obj) => dispatch(editDiscModelSchedule(obj)),
        addDiscSchedule: (obj) => dispatch(addDiscSchedule(obj)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(DisciplineScheduleTable);
