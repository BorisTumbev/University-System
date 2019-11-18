import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurvey } from "../../../actions/survey";
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

const { Option } = Select;

export class SurveyResolveForm extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        this.props.getSurvey(this.props.match.params.id);
        console.log('asd');
        console.log(this.props.match.params);

    }

    componentDidUpdate(){
        console.log(this.props.match.params);
    }


  render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

    return (
        <>
            <h1>qQq</h1>
        </>
    );
  }
}

const mapStateToProps = state => ({
//    majors: state.major.majors,
    isAuthenticated: state.auth.token != null,
});

function mapDispatchToProps(dispatch) {
    return {
//        getMajors: () => dispatch(getMajors()),
        getSurvey: (id) => dispatch(getSurvey(id)),
  };
}

const SuReForm = Form.create()(SurveyResolveForm);
export default connect(mapStateToProps, mapDispatchToProps)(SuReForm);
