import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformFive.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformFive extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第五页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第五页</span>
        </p>

      </div>
    )
  }
}
