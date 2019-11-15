import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMajors } from "../../../actions/major";
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
        this.props.getMajors();
    }

    removeQ = q => {
        delete this.state.answer_arr[q];
        this.setState(prevState => {
            return {
                questions_count: prevState.questions_count - 1,
            }
        });
    };

    addQ = () => {
        let q_count = this.state.questions_count + 1;
        let q = 'q' + q_count;
        this.setState(prevState => {
            return {
                questions_count: prevState.questions_count+1,
                answer_arr: {...prevState.answer_arr, [q]: []}
            }
        });
    };

    removeA = (a, i) => {
        var q = 'q'+i;
        var a_count = this.state.answer_arr[q].filter(item => item !== a);
        this.setState(prevState => {
            return {
                answer_arr: {...prevState.answer_arr, [q]: a_count}
            }
        });
    };

    addA = index => {
        var q = 'q'+index;
        var a_count = this.state.answer_count + 1;
        var answ = 'a' + a_count;
        this.state.answer_arr[q].push(answ);
        var a_arr = this.state.answer_arr[q];
        this.setState(prevState => {
            return {
                answer_count: prevState.answer_count + 1,
                answer_arr: {...prevState.answer_arr, [q]: a_arr}
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var questions = [];

                Object.entries(values).forEach(([key, value]) => {
                    if(key.startsWith('question')){
                        var index = questions.push({
                                    title:value,
                                    answers:[]
                                }) -1;
                        Object.entries(values).forEach(([k, v]) => {
                            if(k.startsWith('answer') && key.slice(-2) === k.slice(-2)){
                                questions[index].answers.push({
                                    title: v
                                })
                            }
                        })
                    }
                });

                var values_to_post = {
                    title: values.title,
                    major: values.major,
                    questions: questions
                };
                this.props.addSurvey(values_to_post);
            }
        });
    };

    majorOptions(){
        return this.props.majors.map(function (e, index){
            return <Option key={e.id} value={e.id}>{e.name}</Option>
        });
    }

    questionsRender(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let that = this;
        var answers = []

        return Object.keys(this.state.answer_arr).map(function(e, i){
            answers = []
            that.state.answer_arr[e].map(function(a, a_i){
                answers.push(
                    <div key={a_i} style={{marginLeft:"65px"}}>
                        <Form.Item label={`answer - ${a_i + 1}`}>
                            {getFieldDecorator(`answer-${a}-${e}`, {
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
                            onClick={() => that.removeA(a, i)}
                        />
                    </div>
                )

            })
            return(
                <div key={i} style={{marginLeft:"20px"}}>
                    <Form.Item label={`question - ${i + 1}`}>
                        {getFieldDecorator(`question-${e}`, {
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
                        onClick={() => that.removeQ(e)}
                    />
                    {answers}
                    <div className="VallAs" onClick={() => that.addA(i)}>
                        <span>+ Add Answer</span>
                    </div>
                </div>
            )
        })

        return questions
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
          <Button type="dashed" onClick={this.addQ} style={{ width: "60%" }}>
            <Icon type="plus" /> Add question
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
    majors: state.major.majors,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
        getMajors: () => dispatch(getMajors()),
        addSurvey: (survey) => dispatch(addSurvey(survey)),
  };
}
const SuForm = Form.create()(SurveyForm);
export default connect(mapStateToProps, mapDispatchToProps)(SuForm);
