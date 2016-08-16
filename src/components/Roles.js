'use strict';

import React from "react";
import { Card, Table } from 'antd';
import { Row, Col } from 'antd';

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];


class Roles extends React.Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {


  }

  render() {

    return(
      <div>
        <Row type="flex" justify="center" align="middle" style={{ background: '#ECECEC', height: "100%", textAlign: "center" }}>
          <Col span={16}>
          </Col>

        </Row>
          <Row type="flex" justify="center" align="middle" style={{ background: '#ECECEC', height: "100%", textAlign: "center" }}>
            <Table dataSource={dataSource} columns={columns} />
          </Row>
      </div>
    );
  }
}


export default Roles;
