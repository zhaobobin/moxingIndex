import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Event extends React.Component {

  render(){
    return(
      <div>
        重大事项
      </div>
    )
  }

}
