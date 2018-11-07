import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class PlatformIndex extends React.Component {

  render(){
    return(
      <div>
        平台优势
      </div>
    )
  }

}
