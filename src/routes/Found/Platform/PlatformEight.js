import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformEight.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformEight extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第八页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第八页</span>
        </p>

      </div>
    )
  }
}
