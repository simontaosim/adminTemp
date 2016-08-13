'use strict';


import React from 'react';
import { Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { hashHistory, Link } from 'react-router';
import './Layout.css';
import "antd/dist/antd.min.css"

const SubMenu = Menu.SubMenu;
const currentUser = Bmob.User.current();

let mainTitleStyle = {
  position: "relative",
  top:"36px"
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      collapse: true,
    };
  }
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }
  componentWillMount(){
    if (currentUser) {
      // console.log(currentUser);
    }else {
      hashHistory.replace("login");
    }
  }

  handleLogOutBtnClicked(e){
    if (e.key == "logout") {
      Bmob.User.logOut();
      hashHistory.replace("login");
    }
  }

  handleMemuClick(e) {
    if (e.key == "users") {
      hashHistory.push("users");
    }
    if (e.key=="roles") {
      hashHistory.push("roles")

    }
  }
  generateMainTitle(pathname){
    //根据pathname去生成一页的主要标题
    switch (pathname) {
      case '/users':
      return (
        <h2 style={mainTitleStyle}>用户管理</h2>
        );
        break;
      case '/roles':
      return (
        <h2 style={mainTitleStyle}>角色管理</h2>
        );

        break;
      case '/':
      return (
        <h2 style={mainTitleStyle}>仪表盘</h2>
        );
        break;
      default:
        return (
          <h2 style={mainTitleStyle}></h2>
        );

    }

  }

  render() {
    const collapse = this.state.collapse;
    const {location} = this.props
    // console.log(location);
    const headerUserMenu = (
        <Menu onClick={this.handleLogOutBtnClicked.bind(this)}>
          <Menu.Item>
            个人中心
          </Menu.Item>
          <Menu.Item key="logout">
            登出
          </Menu.Item>
        </Menu>
      );





    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo" style={{textAlign: "center"}}><Link to="/">仪表盘</Link></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['']} onClick={this.handleMemuClick.bind(this)}>
            <Menu.Item key="users">
              <Icon type="user" /><span className="nav-text">用户管理</span>
            </Menu.Item>
            <Menu.Item key="roles">
              <Icon type="team" /><span className="nav-text">角色管理</span>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" /><span className="nav-text">设置</span>
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="laptop" /><span className="nav-text">导航三</span>
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" /><span className="nav-text">导航四</span>
            </Menu.Item>
            <Menu.Item key="folder">
              <Icon type="folder" /><span className="nav-text">导航五</span>
            </Menu.Item>
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
              {this.generateMainTitle(location.pathname)}
              <Dropdown.Button overlay={headerUserMenu}  style={{float: "right", margin: "5px"}} type="primary">
                  {currentUser.attributes.email}
              </Dropdown.Button>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ height: "auto" }}>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
          cosgoal 版权所有 © 2016 深圳市天上来科技有限公司
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
