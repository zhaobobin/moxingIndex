import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class SbDetail extends React.Component {

  render(){
    return(
      <div>
        散标详情
      </div>
    )
  }

}
