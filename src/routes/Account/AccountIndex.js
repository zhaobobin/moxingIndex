import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class AccountIndex extends React.Component {

  render(){
    return(
      <div>
        账户首页
      </div>
    )
  }

}
