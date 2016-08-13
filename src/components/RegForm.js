'use strict';
import React from "react";
import { Form, Input, Button, Spin, message } from 'antd';
const FormItem = Form.Item;
import { hashHistory } from 'react-router';

class RegForm extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      loading: false
    };

  }

  handleSubmit(e) {
     e.preventDefault();
     this.setState({loading: true});
     let user = new Bmob.User();
      user.set("username", this.props.form.getFieldsValue().username);
      user.set("password", this.props.form.getFieldsValue().password);
      user.set("email", this.props.form.getFieldsValue().email);

      // other fields can be set just like with Bmob.Object
      // user.set("phone", "415-392-0202");

      user.signUp(null, {
        success: (user) => this.handleSignUpSuccess(user),
        error: (user,error) => this.handleSignUpError(user,error)
      });
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

  render() {
     const { getFieldProps } = this.props.form;
    return (
      <Spin spinning={this.state.loading} size="small">
        <Spin spinning={this.state.loading} />
        <Spin spinning={this.state.loading} size="large" />
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          label="邮箱"
        >
          <Input placeholder="请输入邮箱"
            {...getFieldProps('email')}
          />
        </FormItem>
         <FormItem
           label="密码"
         >
           <Input type="password" placeholder="请输入密码"
             {...getFieldProps('password')}
           />
         </FormItem>
         <FormItem
           label="账户"
         >
           <Input placeholder="请输入账户名"
             {...getFieldProps('username')}
           />
         </FormItem>

         <Button type="primary" htmlType="submit">注册</Button>
         <p>已有账户？</p>
         <Button type="dashed" style={{position: "relative", left: "30px"}}
         onClick={()=>{ hashHistory.push("login") }}
         >登录</Button>
       </Form>
     </Spin>
    );
  }
}
RegForm = Form.create()(RegForm);
export default RegForm;
