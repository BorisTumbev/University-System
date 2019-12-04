import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroups } from "../../../actions/groups";
import { getDisciplines, addDiscSchedule } from "../../../actions/discipline";
import { addSurvey } from "../../../actions/survey";
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
  DatePicker,
  TimePicker
} from 'antd';

const { Option } = Select;

export class DisciplineScheduleForm extends Component {

    componentDidMount(){
        this.props.getGroups();
        this.props.getDisciplines();
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
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
            }
        });
    };

    groupsOptions(){
        return this.props.groups.map(function (e, index){
          return <Option key={e.id} value={e.id}>{e.name}</Option>
        })
    }

    disciplineOptions(){
        return this.props.disciplines.map(function (e, index){
          return <Option key={e.id} value={e.id}>{e.name}</Option>
        })
    }

  render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 }
          }
        };
        const formItemLayoutWithOutLabel = {
          wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 }
          }
        };

        const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Group" hasFeedback>
            {getFieldDecorator('group', {
                rules: [{ required: true, message: 'Please select group!' }],
            })(
            <Select placeholder="Please select a group">
                {this.groupsOptions()}
            </Select>,
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Discipline" hasFeedback>
            {getFieldDecorator('discipline', {
                rules: [{ required: true, message: 'Please select discipline!' }],
            })(
            <Select placeholder="Please select a discipline">
                {this.disciplineOptions()}
            </Select>,
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Type" hasFeedback>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Please select type!' }],
          })(
            <Select placeholder="Please select a type">
              <Option value="P">Practice</Option>
              <Option value="L">Lecture</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Start">
          {getFieldDecorator('start', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="End">
          {getFieldDecorator('end', config)(<TimePicker />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="End of whole practice">
          {getFieldDecorator('rrule_end', config)(<DatePicker />)}
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
    groups: state.groups.groups,
    disciplines: state.discipline_schedule.disciplines,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
        getGroups: () => dispatch(getGroups()),
        getDisciplines: () => dispatch(getDisciplines()),
        addDiscSchedule: (obj) => dispatch(addDiscSchedule(obj)),
  };
}
const DiSchForm = Form.create()(DisciplineScheduleForm);
export default connect(mapStateToProps, mapDispatchToProps)(DiSchForm);
