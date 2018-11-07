import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Download extends React.Component {

  render(){
    return(
      <div>
        App下载
      </div>
    )
  }

}
