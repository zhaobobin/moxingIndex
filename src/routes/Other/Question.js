import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Question extends React.Component {

  render(){
    return(
      <div>
        常见问题
      </div>
    )
  }

}
