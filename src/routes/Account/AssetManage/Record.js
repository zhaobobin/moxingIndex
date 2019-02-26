import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(state => ({
  global: state.global,
}))
export default class Record extends React.Component {

  render(){
    return(
      <div>

        交易记录

      </div>
    )
  }

}
