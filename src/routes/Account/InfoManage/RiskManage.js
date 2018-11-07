import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class RiskManage extends React.Component {

  render(){
    return(
      <div>
        风险测评
      </div>
    )
  }

}
