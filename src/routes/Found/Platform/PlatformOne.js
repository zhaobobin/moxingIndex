import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformOne.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformOne extends React.Component {

  render(){
    return(
    <div className={styles.PagesBox}>
      {/*第一页*/}
      <p className={styles.Pages}>
        <span className={styles.Page}>第一页</span>
      </p>
      <div className={styles.TitleBox}>
        <p>等保三级认证</p>
        <p>银行资金存管</p>
        <p>ICP经营许可证</p>
        <img src={require("~/assets/platform/found_platform_icon1@2x.png")} alt="" className={styles.ICP}/>
        <img src={require("~/assets/platform/found_platform_icon3@2x.png")} alt="" className={styles.Spaceman }/>
      </div>
      <p className={styles.QutouwangBox}>
        <img src={require("~/assets/platform/found_platform_logo@2x.png")} alt="" className={styles.Qutouwang }/>
      </p>
      <div className={styles.ContBox}>
        <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.CornerLt }/>
        <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.CornerRt }/>
        <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.CornerLb }/>
        <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.CornerRb }/>
        <div>
          去投网（北京恒远鑫达投资管理有限公司）注册/实收资本1.5亿元，去投网作为中国创新型P2P网络借贷信息中介机构，
          利用互联网提供多样化的出借模式，从用户角度出发，制定出符合用户实际需求的出借方案，带给用户“安心•贴心•放心”
          的服务。
        </div>
      </div>
      <img src={require("~/assets/platform/found_platform_icon2@2x.png")} alt="" className={styles.Coin}/>
        <img src={require("~/assets/platform/found_platform_next@2x.png")} alt="" className={styles.belowImg }/>
    </div>
    )
  }
}
