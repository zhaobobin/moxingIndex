import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class CzResult extends React.Component {

  render(){
    return(
      <div>
        充值成功
      </div>
    )
  }

}
