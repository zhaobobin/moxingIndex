import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class ActivityList extends React.Component {

  render(){
    return(
      <div>
        活动列表
      </div>
    )
  }

}
