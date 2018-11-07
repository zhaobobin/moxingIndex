import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Education extends React.Component {

  render(){
    return(
      <div>
        出借人教育
      </div>
    )
  }

}
