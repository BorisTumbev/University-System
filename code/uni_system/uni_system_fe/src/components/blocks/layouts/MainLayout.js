import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button, message } from 'antd';
import { logout } from "../../../actions/auth";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export class MainLayout extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    componentDidMount(){
//        this.props.getSurveyLog();
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleButtonClick(e) {
//      message.info('Click on left button.');
      console.log('click left button', e);
      if(this.props.user.hasOwnProperty('student_profile')){
        this.props.history.push('/profile');
      }
    }

    handleMenuClick(e) {
    //      message.info('Click on menu item.');
        console.log('click', e);
        if(e.key === 'details'){
            if(this.props.user.hasOwnProperty('student_profile')){
                this.props.history.push('/profile');
            }
        }
        else if(e.key === 'logout'){
            this.props.logout();
        }
        else if(e.key === 'pass-reset'){
            this.props.history.push('/reset-pass');
        }
    }

    handleLeftMenuClick(e) {
    //      message.info('Click on menu item.');
        console.log('click', e);
        if(e.key === 'survey'){
            this.props.history.push('/survey');
        }
        else if(e.key === 'control'){
            this.props.history.push('/control-panel');
        }
        else if(e.key === 'student'){
            this.props.history.push('/students');
        }
        else if(e.key === 'teacher'){
            this.props.history.push('/teachers');
        }
    }

    render() {
        var user = {}
        if(this.props.user !== null){
            user = this.props.user
        }


        const menu = (
          <Menu onClick={(e) => {this.handleMenuClick(e)}}>
            <Menu.Item key="details">
              <Icon type="info-circle" />
                Details
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              Logout
            </Menu.Item>
            <Menu.Item key="pass-reset">
              <Icon type="lock" />
              Password reset
            </Menu.Item>
          </Menu>
        );


        return (
            <>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <a href='#/' >
                  <div className="logo" />
                </a>
              <Menu onClick={(e) => {this.handleLeftMenuClick(e)}} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="survey">
                  <Icon type="pie-chart" />
                  <span>Surveys</span>
                </Menu.Item>
                {user.is_superuser &&
                    <Menu.Item key="control">
                      <Icon type="control" />
                      <span>Control Panel</span>
                    </Menu.Item>
                }
                {user.is_superuser &&
                    <SubMenu
                      key="sub1"
                      title={
                        <span>
                          <Icon type="user" />
                          <span>Users</span>
                        </span>
                      }
                    >
                      <Menu.Item key="student">Students</Menu.Item>
                      <Menu.Item key="teacher">Teachers</Menu.Item>
                    </SubMenu>
                }
              </Menu>
            </Sider>
            <Layout>
              <Header className="header" style={{ background: '#fff', padding: 0, marginBottom: 18 }} >
                <Dropdown.Button onClick={(e) => {this.handleButtonClick(e)}} className="profile-dd" overlay={menu} icon={<Icon type="user" />}>
                  Profile
                </Dropdown.Button>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <div id='main-card' style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>©2019 Created by Borkata</Footer>
            </Layout>
          </Layout>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
  };
}
//const GrForm = Form.create()(GradeForm);
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
//export default StudentDetails;
