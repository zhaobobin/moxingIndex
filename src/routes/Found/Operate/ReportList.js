import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class ReportList extends React.Component {

  render(){
    return(
      <div>
        运营报告列表
      </div>
    )
  }

}
