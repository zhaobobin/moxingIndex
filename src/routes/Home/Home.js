import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(state => ({
  global: state.global,
}))
export default class Home extends React.Component {

  render(){
    return(
      <div>

        首页

      </div>
    )
  }

}
