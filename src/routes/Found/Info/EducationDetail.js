import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class EducationDetail extends React.Component {

  render(){
    return(
      <div>
        出借人教育 - 详情
      </div>
    )
  }

}
