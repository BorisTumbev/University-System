import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


export class Thanks extends Component {

    render() {
        return (
            <>
                <h1>Thanks for participating</h1>
            </>
        );

    }
}


export default (Thanks);