import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class TxResult extends React.Component {

  render(){
    return(
      <div>
        提现成功
      </div>
    )
  }

}
