import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Login extends React.Component {

  render(){
    return(
      <div>
        登录
      </div>
    )
  }

}
