'use strict';

import React from "react";
import { Card, Table, Spin, Button, Pagination } from 'antd';
import { Row, Col } from 'antd';
import NewUser from './NewUser';
import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import {changeUsername, changeFormData, changeFormLoading} from '../actions/RegForm';
import {queryLatestUsers, addOneUser} from '../actions/Users';




class Users extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      newUserVisible: false,
      selectedRowKeys: []
    };
  }



  componentDidMount() {

    const {dispatch, users, loading, pageSize, total, condition} = this.props;
    dispatch(queryLatestUsers(condition));
    dispatch(changeFormData(
      {
        email: '',
        password: '',
        username: ''
      }
    ));
  }

  handleNewUserOnOk(e) {
      const {dispatch} = this.props;
      dispatch(addOneUser());
      this.setState({newUserVisible: false});
      dispatch(changeFormData(
        {
          email: '',
          password: '',
          username: ''
        }
      ));
  }
  handleNewUserOnCancel() {
    const {dispatch} = this.props;
    dispatch(changeFormLoading(false));
    this.setState({newUserVisible: false});
    dispatch(changeFormData(
      {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        username: {
          value: ''
        }
      }
    ));
  }

  tableDataChange(pagination, filters, sorter) {
    this.setState({ selectedRowKeys: [] });
    const {dispatch} = this.props;
    let condition = {
      pagination: pagination
    };
    dispatch(queryLatestUsers(condition));

  }

  showUserAndEdit(id, key){
    console.log(id);
      console.log(key);
  }

  deleteUser(id, key){
    console.log(id);
    console.log(key);

  }

  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  getCheckboxProps(record){
    console.log(record);
    return {
      disabled: record.username === 'simontaosim',    // 配置无法勾选的列
    }
  }


  render() {
    const columns = [{
      title: '用户编码',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length
    },{
      title: '注册时间',
      dataIndex: 'create_at',
      key: 'create_at',
      sorter: (a, b) => Date.parse(a.create_at.replace(/-/g,"/")) - Date.parse(b.create_at.replace(/-/g,"/")),
    },{
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a, b) => Date.parse(a.updated_at.replace(/-/g,"/")) - Date.parse(b.updated_at.replace(/-/g,"/")),
    },
    {
      title: '操作',
      dataIndex: 'opera',
      key: 'opera',
      render: (text, record) => (
        <span>
          <a onClick={this.showUserAndEdit.bind(this, record.id, record.key)}>查看详细/编辑</a>
          &nbsp;|&nbsp;
          <a onClick={this.deleteUser.bind(this, record.id, record.key)}>删除</a>
        </span>
      )
    }];



    const {dispatch, users, loading, pageSize, total, condition} = this.props;

    let selectedRowKeys = this.state.selectedRowKeys;

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    return(

      <div>
        <Row type="flex" justify="center" align="middle" style={{  height: "100%", textAlign: "center" }}>
          <Col span={4}>
            <Button  type="primary" onClick={()=> this.setState({newUserVisible: true}) }>新增用户</Button>
            <NewUser visible={this.state.newUserVisible} onOk={this.handleNewUserOnOk.bind(this)}
            onCancel={this.handleNewUserOnCancel.bind(this)}/>
          </Col>
          <Col span={20}>

          </Col>

        </Row>
          <Row type="flex" justify="center" align="middle" style={{ height: "100%", textAlign: "center" }}>

            <Col span={24}>
              <Table dataSource={this.props.users}  rowSelection={rowSelection}
              columns={columns} loading={this.props.loading}
              onChange={this.tableDataChange.bind(this)} pagination={this.props.condition.pagination}
              />
            </Col>
          </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    regForm: state.RegForm,
    loading: state.RegForm.isLoading,
    users: state.Users.data,
    loading: state.Users.loading,
    pageSize: state.Users.pageSize,
    total: state.Users.total,
    condition: state.condition
   };
}

export default connect(mapStateToProps)(Users);
