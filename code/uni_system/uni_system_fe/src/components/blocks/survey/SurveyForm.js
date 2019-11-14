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

    constructor(props){
        super(props);

        this.state = {
            questions_count: -1,
            answer_count: -1,
            answer_arr: {},
        }
    }

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

    let q_count = this.state.questions_count + 1;
    let q = 'q' + q_count;
    this.setState(prevState => {
       return {
                questions_count: prevState.questions_count+1,
                answer_arr: {...prevState.answer_arr, [q]: []}
        }
    })
  };

  remove1 = (a, i) => {
    console.log('remove answe');
    console.log(i);
    console.log(a);
        var q = 'q'+i
        var a_count = this.state.answer_arr[q].filter(item => item !== a)
        this.setState(prevState => {
           return {
//                answer_count: prevState.answer_count - 1,
                answer_arr: {...prevState.answer_arr, [q]: a_count}}
        })
  };

  add1 = index => {
    console.log('add answ');
    console.log(index);

    var q = 'q'+index
    var a_count = this.state.answer_count + 1
    var answ = 'a' + a_count
    this.state.answer_arr[q].push(answ)
    var a_arr = this.state.answer_arr[q]
    this.setState(prevState => {
       return {
                answer_count: prevState.answer_count + 1,
                answer_arr: {...prevState.answer_arr, [q]: a_arr}
       }
    })
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

    questionsRender(){
        console.log('vlena bate maiko');
        console.log(this.state);
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let that = this;
        var i, k;
        var answers = []
//        for(i=0; i<=this.state.questions_count; i++){
//            console.log('i');
//            console.log(i);
//              questions.push(


        return Object.keys(this.state.answer_arr).map(function(e, i){
                console.log('aa');
                console.log(e);
                console.log(i);
                console.log(that.state.answer_arr[e]);
                answers = []
                that.state.answer_arr[e].map(function(a, a_i){
                    answers.push(
                        <div key={a_i} style={{marginLeft:"65px"}}>
                          <Form.Item label="answer">
                            {getFieldDecorator('answer' + a + e, {
                                rules: [{ required: true,
                                          message: 'Please input answer!'
                                }],
                            })(
                                <Input/>,
                            )}
                        </Form.Item>
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => that.remove1(a, i)}

                        />
                        </div>
                    )

                })

//                for(k=0; k<that.state.answer_count[e]; k++){
//                    answers.push(
//                    <div key={k} style={{marginLeft:"65px"}}>
//                      <Form.Item label="answer">
//                        {getFieldDecorator('answer' + k + e, {
//                            rules: [{ required: true,
//                                      message: 'Please input answer!'
//                            }],
//                        })(
//                            <Input/>,
//                        )}
//                    </Form.Item>
//                    <Icon
//                        className="dynamic-delete-button"
//                        type="minus-circle-o"
//                        onClick={() => that.remove1(i)}
//
//                    />
//                    </div>
//                    )
//                }

            return(
                  <div key={i} style={{marginLeft:"20px"}}>
                  <Form.Item label="question">
                    {getFieldDecorator('question' + i, {
                        rules: [{ required: true,
                                  message: 'Please input question!'
                        }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(i)}
                />
                {answers}
                <div className="VallAs" onClick={() => that.add1(i)}>
                  <span>+ Add Answer</span>
                </div>
                </div>
            )
       })
//            )
//        }
        return questions
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

    console.log('maikataaaa');
    console.log(this.state.questions_count);

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
        {this.questionsRender()}
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