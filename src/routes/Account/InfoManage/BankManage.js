import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class BankManage extends React.Component {

  render(){
    return(
      <div>
        银行卡信息
      </div>
    )
  }

}
