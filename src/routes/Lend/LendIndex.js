import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class LendIndex extends React.Component {

  render(){
    return(
      <div>
        出借首页
      </div>
    )
  }

}
