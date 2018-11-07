import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Demo extends React.Component {

  render(){
    return(
      <div>
        demo
      </div>
    )
  }

}
