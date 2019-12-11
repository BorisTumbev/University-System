import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editMajor } from "../../../actions/major";
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
import MajorForm from './MajorForm';
const { Option } = Select;


export class MajorTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            searchText: '',
            searchedColumn: '',
            major: {}
        }
    }


    componentDidMount(){
//        this.props.getDiscModelSchedule();
    };


    edit(record){
        const { form } = this.formRef.props;

        form.setFieldsValue({
            name: record.name,
        })

        this.setState({
            showForm: true,
            major: record,
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
                values.id = this.state.major.id;
                this.props.editMajor(values);
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
                ...this.getColumnSearchProps('name', 'Major'),
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
            <Table className='contr-panel-tbl' columns={columns} dataSource={this.props.majors} pagination={{ pageSize: 10 }}
                    rowKey='id'/>

            <MajorForm
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
    majors: state.major.majors,
});

function mapDispatchToProps(dispatch) {
    return {
        editMajor: (major) => dispatch(editMajor(major)),
//        addDiscSchedule: (obj) => dispatch(addDiscSchedule(obj)),
  };
}
//const StForm = Form.create()(StudentForm);
export default connect(mapStateToProps, mapDispatchToProps)(MajorTable);
