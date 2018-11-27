/**
 * 充值提现
 */
import React from 'react';
import { connect } from 'dva';


@connect(state => ({
  global: state.global,
}))

class Helpmoney extends React.Component {

  render(){

    return(
      <div>
        充值提现
      </div>
    )
  }

}
export default Helpmoney;
