import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class Page404 extends React.Component {

  render(){
    return(
      <div>
        404
      </div>
    )
  }

}
