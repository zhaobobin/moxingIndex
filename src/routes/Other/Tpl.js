import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Tpl extends React.Component {

  render(){
    return(
      <div>
        模版
      </div>
    )
  }

}
