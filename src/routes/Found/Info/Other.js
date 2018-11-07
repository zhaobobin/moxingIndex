import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Other extends React.Component {

  render(){
    return(
      <div>
        其他信息
      </div>
    )
  }

}
