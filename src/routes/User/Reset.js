import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Reset extends React.Component {

  render(){
    return(
      <div>
        找回密码
      </div>
    )
  }

}
