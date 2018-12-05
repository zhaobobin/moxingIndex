import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformSeven.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformSeven extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第七页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第七页</span>
        </p>
        <p className={styles.SevenTitle}>完善的风控管理体系</p>
        <div className={styles.SevenBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.SevenLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.SevenRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.SevenLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.SevenRb }/>
        </div>
      </div>
    )
  }
}
