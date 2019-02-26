import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(state => ({
  global: state.global,
}))
export default class CouponsList extends React.Component {

  render(){
    return(
      <div>

        优惠卷列表

      </div>
    )
  }

}
