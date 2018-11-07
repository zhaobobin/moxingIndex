import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Share extends React.Component {

  render(){
    return(
      <div>
        分享详情
      </div>
    )
  }

}
