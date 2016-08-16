'use strict';

import React from "react";
import {Modal, Button} from "antd";
import RegForm0 from './RegForm0';



class NewUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }


  render() {

    return(

      <Modal title="注册一个新用户" visible={this.props.visible}
          onOk={this.props.onOk} onCancel={this.props.onCancel}
          footer={[
         <Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
         <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.props.onOk}>
           提 交
         </Button>,
       ]}
        >
        <div  id="newUserForm">
          <RegForm0 />
        </div>

      </Modal>
    );
  }
}


export default NewUser;
