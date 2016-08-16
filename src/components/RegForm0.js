'use strict';
import React from "react";
import { Form, Input, Button, Spin, message } from 'antd';
const FormItem = Form.Item;

import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import {changeFormData, changeFormLoading} from '../actions/RegForm';

class RegForm0 extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      loading: false
    };

  }

  handleSubmit(e) {
     e.preventDefault();

   }

   handleSignUpSuccess(user) {
     message.success('注册成功！立即登录');
     this.setState({loading: false});
     hashHistory.push("login");
   }
   handleSignUpError(user, error) {
     // Show the error message somewhere and let the user try again.
     message.error("Error: " + error.code + " " + error.message);
     this.setState({loading: false});
     this.props.form.setFieldsValue({
       email: '',
       password: '',
       username: ''
     });

   }
   componentDidMount() {

   }

  render() {

     const { getFieldProps } = this.props.form;
     const { dispatch, regForm, loading } = this.props;

    return (
      <Spin spinning={this.props.loading} size="small">
        <Spin spinning={this.props.loading} />
        <Spin spinning={this.props.loading} size="large" />
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          label="邮箱"
          required = {true}
        >
          <Input placeholder="请输入邮箱"
            {...getFieldProps('email')} value={this.props.regForm.email.value}
          />
        </FormItem>
         <FormItem
           label="密码"
             required = {true}
         >
           <Input type="password" placeholder="请输入密码"
             {...getFieldProps('password')}  value={this.props.regForm.password.value}
           />
         </FormItem>
         <FormItem
           label="账户"
             required = {true}
         >
           <Input placeholder="请输入账户名"
             {...getFieldProps('username')}  value={this.props.regForm.username.value}
           />
         </FormItem>
       </Form>
     </Spin>
    );
  }
}
function mapStateToProps(state) {
  return {
    regForm: state.RegForm,
    loading: state.RegForm.isLoading
   };
}
function onFieldsChange(props, fields){
  const { dispatch } = props;
  dispatch(changeFormData(fields));

}


RegForm0 = Form.create({onFieldsChange})(RegForm0);
export default connect(mapStateToProps)(RegForm0);
