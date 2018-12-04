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
        <p className={styles.FiveTitle}><span>层层风控</span><span>只为最优项</span></p>
        <div className={styles.FiveBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.FiveLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.FiveRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.FiveLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.FiveRb }/>
        </div>
      </div>
    )
  }
}
