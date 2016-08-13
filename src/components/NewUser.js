'use strict';

import React from "react";
import {Modal} from "antd"
import RegForm from "./RegForm"

class NewUser extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <Modal title="注册一个新用户" visible={this.props.visible}
          onOk={this.props.onOk} onCancel={this.props.onCancel}
        >
        <RegForm />
      </Modal>
    );
  }
}


export default NewUser;
