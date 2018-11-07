import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class AccountTotal extends React.Component {

  render(){
    return(
      <div>
        账户总览
      </div>
    )
  }

}
