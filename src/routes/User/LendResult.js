import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class LendResult extends React.Component {

  render(){
    return(
      <div>
        出借成功
      </div>
    )
  }

}
