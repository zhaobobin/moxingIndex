import React from 'react';
import { connect } from 'dva';
//样式
import styles from './Bankdepositor.less';

@connect(state => ({
  global: state.global,
}))
export default class Bankdepositor extends React.Component {    
  render(){    
    return(
      <div>dddddddd</div>
    )
  }

}
