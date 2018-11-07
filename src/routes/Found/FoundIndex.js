import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class FoundIndex extends React.Component {

  render(){
    return(
      <div>
        发现首页
      </div>
    )
  }

}
