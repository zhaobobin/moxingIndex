import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class NewsList extends React.Component {

  render(){
    return(
      <div>
        公司新鲜事列表
      </div>
    )
  }

}
