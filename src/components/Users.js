'use strict';

import React from "react";
import { Card, Table, Spin, Button } from 'antd';
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
  title: '用户编码',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '电子邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
},{
  title: '注册时间',
  dataIndex: 'create_at',
  key: 'create_at',
},{
  title: '更新时间',
  dataIndex: 'updated_at',
  key: 'updated_at',
}];


class Users extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  handleQuerySuccess(results) {
    console.log("共查询到 " + results.length + " 条记录");
    // 循环处理查询到的数据
    let dataSource = this.state.dataSource;
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      let objToPush = {
        id: object.id,
        username: object.get('username'),
        email: object.get('email'),
        create_at: object.createdAt,
        updated_at: object.updatedAt
      }
      dataSource.push(objToPush)
      this.setState({
        loading: false,
        dataSource: dataSource
      });
    }

  }

  handleQueryError(error) {
      console.log("查询失败: " + error.code + " " + error.message);
  }

  componentWillMount(){
    var query = new Bmob.Query(Bmob.User);
    // 查询所有数据
    query.find({
      success: (results) => this.handleQuerySuccess(results),
      error: (error) => this.handleQueryError(error)
    });
  }

  render() {

    return(
      <div>
        <Row type="flex" justify="center" align="middle" style={{ background: '#ECECEC', height: "100%", textAlign: "center" }}>
          <Col span={4}>
            <Button  type="primary">新增用户</Button>
          </Col>
          <Col span={20}>

          </Col>

        </Row>
         <Spin spinning={this.state.loading} size="small">
          <Spin spinning={this.state.loading} />
          <Spin spinning={this.state.loading} size="large" />
          <Row type="flex" justify="center" align="middle" style={{ background: '#ECECEC', height: "100%", textAlign: "center" }}>

            <Col span={24}>
              <Table dataSource={this.state.dataSource} columns={columns} />
            </Col>
          </Row>
         </Spin>
      </div>
    );
  }
}


export default Users;
