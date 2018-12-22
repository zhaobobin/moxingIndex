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
        {/*第六页
        <p className={styles.Pages}>
          <span className={styles.Page}>第五页</span>
        </p>*/}
        <p className={styles.SixTitle}>智能分散 降低出借风险</p>
        <div className={styles.SixBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.SixLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.SixRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.SixLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.SixRb }/>
          {/*<img src={require("~/assets/platform/found_platform_pg61@2x.png")} alt="" className={styles.SixContImg }/>*/}
          <div className={styles.SixContImgBox}>
            <p className={styles.investor}>出借人</p>
          </div>

          <p>1.在优质项目的基础上，出借风险随着出借项目数量的增多而减少。</p>
          <p>2.去投网专业的金融团队搭建了智能分散匹配模式，用户只需要买入，后台系统自动将出借资金小额分散到多个项目中，有效降低单一借款人违约的风险。</p>
        </div>
      </div>
    )
  }
}
