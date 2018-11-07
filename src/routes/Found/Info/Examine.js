import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Examine extends React.Component {

  render(){
    return(
      <div>
        审核信息
      </div>
    )
  }

}
