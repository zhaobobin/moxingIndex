import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(state => ({
  global: state.global,
}))
export default class AccountAssets extends React.Component {

  render(){
    return(
      <div>

        账户资产

      </div>
    )
  }

}
