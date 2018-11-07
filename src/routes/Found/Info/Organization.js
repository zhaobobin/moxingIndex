import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Organization extends React.Component {

  render(){
    return(
      <div>
        组织信息
      </div>
    )
  }

}
