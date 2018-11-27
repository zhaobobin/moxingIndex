/**
 * 安心签
 */
import React from 'react';
import { connect } from 'dva';


@connect(state => ({
  global: state.global,
}))

class Helpmind extends React.Component {

  render(){

    return(
      <div>
        安心签
      </div>
    )
  }

}
export default Helpmind;
