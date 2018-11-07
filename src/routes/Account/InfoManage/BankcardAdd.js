import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class BankcardAdd extends React.Component {

  render(){
    return(
      <div>
        银行卡绑定成功
      </div>
    )
  }

}
