import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMajors } from "../../../actions/major";
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
  Switch
} from 'antd';

const FormItem = Form.Item;

let id = 0;
let uuid = 0;
let uuid1 = 0;
const { Option } = Select;

export class SurveyForm extends Component {

    componentDidMount(){
        this.props.getMajors()

    }

 remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("newkeys");
    // We need at least one passenger
    if (keys.length === 1) {
      //return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      newkeys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("newkeys");
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      newkeys: nextKeys
    });
  };

  remove1 = (k, l) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("answerkey" + k);
    let newkeys = [];
    // We need at least one passenger
    if (keys) {
      newkeys = keys;
    } else {
      newkeys = [];
    }
    if (newkeys.length === 1) {
      //return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      ["answerkey" + k]: newkeys.filter(key => key !== l)
    });
  };

  add1 = index => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("answerkey" + index);
    let newkeys = [];
    if (keys) {
      newkeys = keys;
    } else {
      newkeys = [];
    }
    const nextKeys = newkeys.concat(uuid1);
    uuid1++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      ["answerkey" + index]: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
    majorOptions(){
        return this.props.majors.map(function (e, index){
          return <Option key={e.id} value={e.id}>{e.name}</Option>
        })
    }

  render() {
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
    var newkeys = [];
    var answekeys = [];
    var correctAnswer = [];
    getFieldDecorator("newkeys", { initialValue: [] });
    newkeys = getFieldValue("newkeys");
    for (var i = 0; i < newkeys.length; i++) {
      getFieldDecorator("answerkey" + i, { initialValue: [] });

    }
    const formItems = newkeys.map((k, index) => {
      answekeys = getFieldValue("answerkey" + k);
      correctAnswer = getFieldValue("rightanswer" + k);
      if (
        answekeys == undefined ||
        answekeys == null ||
        answekeys.length == 0
      ) {
        answekeys = [];
      }
      return (
        <div>
          <FormItem className="Quest">
            {getFieldDecorator("question" + k, {
              validate: [
                {
                  trigger: ["onBlur"],
                  rules: [
                    {
                      required: true,
                      message: "Please enter your Question!"
                    }
                  ]
                }
              ]
            })(<Input type="" placeholder="Enter Question" />)}
            {newkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
          <ol className="AswField">
            {answekeys &&
              answekeys.length > 0 &&
              answekeys.map((l, index1) => {
                return (
                    <FormItem>
                      {getFieldDecorator("answer" + l, {
                        validate: [
                          {
                            trigger: ["onBlur"],
                            rules: [
                              {
                                required: true,
                                message: "Please enter your Answer"
                              }
                            ]
                          }
                        ]
                      })(<Input type="" placeholder=" Enter Answer" />)}
                      <span
                        className="TickCsl"
                        onClick={() => this.remove1(k, l)}
                      >
                        <Icon type="delete" />
                      </span>
                    </FormItem>
                );
              })}
            <div className="VallAs" onClick={() => this.add1(k)}>
              <span>+ Add Answer</span>
            </div>
          </ol>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
                rules: [{ required: true,
                          message: 'Please input title!'
                }],
            })(
                <Input/>,
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Major" hasFeedback>
            {getFieldDecorator('major', {
                rules: [{ required: true, message: 'Please select major!' }],
            })(
            <Select placeholder="Please select a major">
                {this.majorOptions()}
            </Select>,
            )}
        </Form.Item>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
    majors: state.major.majors
});

function mapDispatchToProps(dispatch) {
    return {
        getMajors: () => dispatch(getMajors()),
//        addTeacher: (teacher) => dispatch(addTeacher(teacher)),
  };
}
const SuForm = Form.create()(SurveyForm);
export default connect(mapStateToProps, mapDispatchToProps)(SuForm);