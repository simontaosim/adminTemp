'use strict';

import React from "react";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import RegForm from './RegForm';


class Reg extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <Row type="flex" justify="space-around" align="middle" style={{ background: '#ECECEC', height: "100%" }}>
        <Col span={16}>
          <Card title="在可思哥数据平台上注册" bordered={false} style={{ width: "100%", height: "auto" }}>
          <RegForm />
          </Card>
        </Col>

      </Row>
    );
  }
}


export default Reg;
