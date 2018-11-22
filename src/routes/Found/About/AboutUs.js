import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class AboutUs extends React.Component {

  render(){
    return(
      <div>
        关于我们
      </div>
    )
  }

}
