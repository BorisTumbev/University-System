import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  Modal,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export class EmailForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
//        this.props.getGroups();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

//                this.props.addTeacher(values_to_post);
            }
        });
    };



    render() {

        const { visible, is_edit, onCancel, onOk, form } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
              labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
              },
              wrapperCol: {
                xs: { span: 16 },
                sm: { span: 8 },
              },
            };
            const tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              },
            };
        return (

            <Modal
              title="Email Form"
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
              okText="Send Email"
              width= '40%'
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Subject">
                      {getFieldDecorator('subject', {
                        rules: [{ required: true,
                                  message: 'Please input subject!'
                        }],
                      })(
                        <Input/>,
                      )}
                    </Form.Item>
                    <Form.Item label="Body Text">
                      {getFieldDecorator('body_text', {
                        rules: [{ required: true,
                                  message: 'Please input message!'
                        }],
                      })(
                        <TextArea rows={4}/>,
                      )}
                    </Form.Item>
                </Form>
            </Modal>
        );

    }
}

const mapStateToProps = state => ({
//    groups: state.groups.groups
});

function mapDispatchToProps(dispatch) {
    return {
//        sendEmail: (group_id, email) => dispatch(sendEmail(group_id, email)),
  };
}
const EmForm = Form.create()(EmailForm);
export default connect(mapStateToProps, mapDispatchToProps)(EmForm);
