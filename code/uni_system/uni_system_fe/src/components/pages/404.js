import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Result, Button } from 'antd';


export class Error404 extends Component {


    backHome(){
        this.props.history.push(`/`)
    }

    render() {
        return (
            <>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button onClick={(e) => {this.backHome()}} type="primary">Back Home</Button>}
                />,
            </>
        );

    }
}


export default (Error404);