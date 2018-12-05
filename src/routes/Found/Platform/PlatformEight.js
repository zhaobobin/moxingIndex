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
          <p className={styles.EightTitle}>合法合规 有效法律保障</p>
        <div className={styles.EightBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.EightLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.EightRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.EightLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.EightRb }/>
          <div className={styles.EightContBox}>
            <img src={require("~/assets/platform/found_platform_pg81@2x.png")} alt="" className={styles.EightImg}/>
            <div className={styles.EightCont1}>
              去投网严格恪守《网络借贷信息中介机构业务活动管理暂行办法》、《互联网金融指导意见》等金融监管法规，远离非法集资，充分信息披露。
            </div>
          </div>
          <div className={styles.EightContBox2}>
            <img src={require("~/assets/platform/found_platform_pg82@2x.png")} alt="" className={styles.EightImg}/>
            <div className={styles.EightCont1}>
              去投网上每一份协议均符合《中华人民共和国合同法》及《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》，受法律保护。
            </div>
          </div>
        </div>
        <img src={require("~/assets/platform/found_platform_next@2x.png")} alt="" className={styles.belowImg }/>
      </div>
    )
  }
}
