import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class ZxDetail extends React.Component {

  render(){
    return(
      <div>
        智享详情
      </div>
    )
  }

}
