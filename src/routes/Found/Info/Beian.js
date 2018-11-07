import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Beian extends React.Component {

  render(){
    return(
      <div>
        备案信息
      </div>
    )
  }

}
