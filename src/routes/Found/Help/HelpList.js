import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class HelpList extends React.Component {

  render(){
    return(
      <div>
        帮助列表
      </div>
    )
  }

}
