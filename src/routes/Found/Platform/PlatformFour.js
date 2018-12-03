import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformFour.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformFour extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第四页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第四页</span>
        </p>
        <p className={styles.multipleTitle}>多重风控</p>
        <div className={styles.multipleImgBox}>
          <img src={require("~/assets/platform/found_platform_pg41@2x.png")} alt="" className={styles.multipleImg}/>
          <img src={require("~/assets/platform/found_platform_pg42@2x.png")} alt="" className={styles.multipleImg}/>
          <img src={require("~/assets/platform/found_platform_pg43@2x.png")} alt="" className={styles.multipleImg}/>
          <img src={require("~/assets/platform/found_platform_pg44@2x.png")} alt="" className={styles.multipleImg}/>
        </div>
      </div>
    )
  }
}
