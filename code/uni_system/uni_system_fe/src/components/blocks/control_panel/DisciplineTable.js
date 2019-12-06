import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editDiscipline } from "../../../actions/discipline";
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
import DisciplineForm from './DisciplineForm';
const { Option } = Select;


export class DisciplineTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            searchText: '',
            searchedColumn: '',
            discipline: {}
        }
    }


    componentDidMount(){
//        this.props.getDiscModelSchedule();
    };


    edit(record){
        const { form } = this.formRef.props;

        form.setFieldsValue({
            name: record.name,
            faculty: record.faculty,
            semester: record.semester,
        })

        this.setState({
            showForm: true,
            discipline: record,
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
                console.log(values);
                values.id = this.state.discipline.id;
                this.props.editDiscipline(values);
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name', 'Group'),
            },
            {
                title: 'Faculty',
                dataIndex: 'faculty',
                key: 'faculty',
                ...this.getColumnSearchProps('faculty', 'Faculty'),
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                key: 'semester',
                ...this.getColumnSearchProps('semester', 'Semester'),
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
            <Table columns={columns} dataSource={this.props.disciplines} pagination={{ pageSize: 10 }}
                    rowKey='id'/>

            <DisciplineForm
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
    disciplines: state.discipline_schedule.disciplines,
});

function mapDispatchToProps(dispatch) {
    return {
        editDiscipline: (disc) => dispatch(editDiscipline(disc)),
//        addDiscSchedule: (obj) => dispatch(addDiscSchedule(obj)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(DisciplineTable);
