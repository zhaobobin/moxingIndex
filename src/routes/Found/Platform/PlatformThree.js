import React from 'react';
import { connect } from 'dva';
import  styles from './PlatformThree.less'
@connect(state => ({
  global: state.global,
}))
export default class PlatformThree extends React.Component {

  render(){
    return(
      <div className={styles.PagesBox}>
        {/*第三页*/}
        <p className={styles.Pages}>
          <span className={styles.Page}>第三页</span>
        </p>
          <p className={styles.DepositTitle}>银行资金存管</p>
        <div className={styles.DepositImgBox}>
          <img src={require("~/assets/platform/found_platform_page2@2x.png")} alt="" className={styles.DepositImg}/>
        </div>
        <div className={styles.DepositBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.DepositLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.DepositRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.DepositLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.DepositRb }/>
          <div>
              <h3>平台上线银行存管</h3>
              <p>用户资金由银行存管，平台无法触碰用户资金。</p>
              <h3>其他人也盗不走您账户里的钱</h3>
              <p>账户资金只能提现到充值的银行卡，即使您的手机 丢失，旁人也无法盗走您的资金。</p>
          </div>
        </div>
      </div>
    )
  }
}
