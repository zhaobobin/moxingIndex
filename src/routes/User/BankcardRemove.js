import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class BankcardRemove extends React.Component {

  render(){
    return(
      <div>
        银行卡解绑成功
      </div>
    )
  }

}
