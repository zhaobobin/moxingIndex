import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class NoticesList extends React.Component {

  render(){
    return(
      <div>
        公告列表
      </div>
    )
  }

}
