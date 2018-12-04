import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformTwo.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformTwo extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第二页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第二页</span>
        </p>
        <p className={styles.ServeTitle}>去投网服务</p>
        <p className={styles.Serve}>智享自动投标服务</p>
        <div className={styles.ServeBox}>
          
        </div>
        <p className={styles.more}>更多优质产品敬请期待</p>
      </div>
    )
  }
}
