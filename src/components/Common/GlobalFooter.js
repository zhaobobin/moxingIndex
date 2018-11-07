import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class GlobalFooter extends React.Component {

  render(){
    return(
      <div>
        全局底部
      </div>
    )
  }

}
