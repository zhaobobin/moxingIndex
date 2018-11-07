import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Personal extends React.Component {

  render(){
    return(
      <div>
        个人信息
      </div>
    )
  }

}
