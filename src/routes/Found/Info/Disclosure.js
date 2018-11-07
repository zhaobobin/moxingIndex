import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Disclosure extends React.Component {

  render(){
    return(
      <div>
        经营信息
      </div>
    )
  }

}
