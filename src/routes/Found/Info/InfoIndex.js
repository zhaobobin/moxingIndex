import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class InfoIndex extends React.Component {

  render(){
    return(
      <div>
        信息披露首页
      </div>
    )
  }

}
