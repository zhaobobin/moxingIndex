import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class RegisterXieyi extends React.Component {

  render(){
    return(
      <div>
        注册协议
      </div>
    )
  }

}
