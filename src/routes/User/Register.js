import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Register extends React.Component {

  render(){
    return(
      <div>
        注册
      </div>
    )
  }

}
