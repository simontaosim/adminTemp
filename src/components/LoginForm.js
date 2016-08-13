'use strict';
import React from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import { hashHistory } from 'react-router';

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

  }

  handleSubmit(e) {
     e.preventDefault();
     console.log('收到表单值：', this.props.form.getFieldsValue());
     Bmob.User.logIn(this.props.form.getFieldsValue().username, this.props.form.getFieldsValue().password, {
      success: (user) => this.handleLogInSuccess(user),
      error: (user, error) => this.handleLogInError(user, error)
      }
    );
   }

   handleLogInSuccess(user) {
     message.success("登录成功！");
     hashHistory.push('/')
   }

   handleLogInError(user, error){
     message.error("用户名或者密码错误！");
     this.props.form.setFieldsValue({
       username: '',
       password: ''
     });
   }

  render() {
     const { getFieldProps } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit.bind(this)}>
       <FormItem
         label="账户"
       >
         <Input placeholder="请输入账户名"
           {...getFieldProps('username')}
         />
       </FormItem>
       <FormItem
         label="密码"
       >
         <Input type="password" placeholder="请输入密码"
           {...getFieldProps('password')}
         />
       </FormItem>

       <Button type="primary" htmlType="submit">登录</Button>
       <Button type="dashed" style={{position: "relative", left: "30px"}}
       onClick={()=>{ hashHistory.push("reg") }}
       >注册</Button>
     </Form>
    );
  }
}
LoginForm = Form.create()(LoginForm);
export default LoginForm;
