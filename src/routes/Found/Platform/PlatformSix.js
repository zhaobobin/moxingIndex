import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformSix.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformSix extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第六页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第六页</span>
        </p>

      </div>
    )
  }
}
