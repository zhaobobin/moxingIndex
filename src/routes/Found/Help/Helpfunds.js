/**
 * 银行资金存管
 */
import React from 'react';
import { connect } from 'dva';


@connect(state => ({
  global: state.global,
}))

class Helpfunds extends React.Component {

  render(){

    return(
      <div>
        银行资金存管银行资金存管银行资金存管银行资金存管
      </div>
    )
  }

}
export default Helpfunds;
