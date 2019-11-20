import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurvey, logSurvey } from "../../../actions/survey";
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
  Radio
} from 'antd';

const { Option } = Select;

export class SurveyResolveForm extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        this.props.getSurvey(this.props.match.params.id);

    }

    componentDidUpdate(){
        console.log(this.props.match.params);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var values_to_post = []
                Object.entries(values).forEach(([q, a]) => {
                    console.log(q)
                    console.log(a)
                    values_to_post.push({
                        user: this.props.curr_user.id,
                        survey: this.props.survey.id,
                        question: q,
                        answer: a,
                    })

                });
                this.props.logSurvey(values_to_post);
            }
        });
    };

    renderQuestions(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let that = this;
        var answers = []

        if(this.props.survey.questions !== undefined){
            return this.props.survey.questions.map(function(e, i){
                answers = [];
                e.answers.map(function(a, a_i){
                    answers.push(
                        <div key={a_i} style={{marginLeft:"65px"}}>
                          <Radio value={a.id}>{a.title}</Radio>
                        </div>
                    )
                })

                return(
                    <div key={i} style={{marginLeft:"20px"}}>
                        <Form.Item label={`${e.title}`}>
                          {getFieldDecorator(`${e.id}`, {rules:[{required: true, message: 'Please select answer'}],})(
                            <Radio.Group>
                                {answers}
                            </Radio.Group>,
                          )}
                        </Form.Item>
                    </div>
                );
            });
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        const title = this.props.survey.title;

        console.log('title');
        console.log(title);
    return (
        <>
        {title ? (
        <>
              <h1>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {this.renderQuestions()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        ) : (
            <b>forbidden</b>
        )}
        </>
    );
  }
}

const mapStateToProps = state => ({
    survey: state.survey.survey,
    isAuthenticated: state.auth.token != null,
    curr_user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
    return {
        logSurvey: (survey) => dispatch(logSurvey(survey)),
        getSurvey: (id) => dispatch(getSurvey(id)),
  };
}

const SuReForm = Form.create()(SurveyResolveForm);
export default connect(mapStateToProps, mapDispatchToProps)(SuReForm);
