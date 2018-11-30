import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class BxDetail extends React.Component {

  render(){
    return(
      <div>
        变现详情
      </div>
    )
  }

}
