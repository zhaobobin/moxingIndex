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
        <div className={styles.multipleBox}>
          <div className={styles.multipleImgBox1}>
            <p>专业风控经验</p>
          </div>
        <div className={styles.multipleImgBox2}>
          <p>优质借款</p>
        </div>
         <div className={styles.multipleImgBox3}>
           <p>撮合交易</p>
         </div>
         <div className={styles.multipleImgBox4}>
           <p>专人负责</p>
         </div>
        </div>
        <div className={styles.multipleContentBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.multipleLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.multipleRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.multipleLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.multipleRb }/>
          <div>
            <p>1.去投网是国内领先的P2P平台，拥有专业风控经验。</p>
            <p>2.专注优质借款</p>
            <p>3.专人负责监督借款人借款后其资金流向。如发现借款人出现资金异常或产生逾期，专业团队通过资产清收、资产重组、法务诉讼等合规的方式，第时 间内保护资金安全。</p>
          </div>
        </div>
        <img src={require("~/assets/platform/found_platform_next@2x.png")} alt="" className={styles.belowImg }/>
      </div>
    )
  }
}
