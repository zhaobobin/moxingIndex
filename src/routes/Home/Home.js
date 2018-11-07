import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Home extends React.Component {

  render(){
    return(
      <div>
        首页
      </div>
    )
  }

}
