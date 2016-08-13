'use strict';

import React from "react";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import LoginForm from './LoginForm';
import { hashHistory } from 'react-router';

const currentUser = Bmob.User.current();

if (currentUser) {
  hashHistory.push("/");
}

class Login extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {


    return(
      <Row type="flex" justify="space-around" align="middle" style={{ background: '#ECECEC', height: "100%", textAlign: "center" }}>
        <Col span={16}>
          <Card title="欢迎登陆可思哥数据平台" bordered={false} style={{ width: "100%", height: "auto", textAlign: "center" }}>
          <LoginForm />
        </Card>
        </Col>

      </Row>
    );
  }
}


export default Login;
