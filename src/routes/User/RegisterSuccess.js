import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class RegisterSuccess extends React.Component {

  render(){
    return(
      <div>
        开户成功
      </div>
    )
  }

}
