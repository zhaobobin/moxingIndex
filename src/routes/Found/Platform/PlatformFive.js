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
        {/*第五页
        <p className={styles.Pages}>
          <span className={styles.Page}>第四页</span>
        </p>*/}
        <p className={styles.FiveTitle}><span>层层风控</span><span>只为最优项</span></p>
        <div className={styles.FiveBox}>
          <img src={require("~/assets/platform/found_platform_lt@2x.png")} alt="" className={styles.FiveLt }/>
          <img src={require("~/assets/platform/found_platform_rt@2x.png")} alt="" className={styles.FiveRt }/>
          <img src={require("~/assets/platform/found_platform_lb@2x.png")} alt="" className={styles.FiveLb }/>
          <img src={require("~/assets/platform/found_platform_rb@2x.png")} alt="" className={styles.FiveRb }/>
          <p className={styles.FiveDotP}>
            <span></span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span className={styles.FiveSp}>确认借款人需求</span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span className={styles.FiveSp2}>申请资料审核</span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span></span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span></span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span className={styles.FiveSp}>信息分析</span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span className={styles.FiveSp2}>风险评估</span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span></span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span></span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span className={styles.FiveSp}>综合分析</span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span className={styles.FiveSp2}>方案制定</span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span></span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span></span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span className={styles.FiveSp}>撮合交易</span>
          </p>
          <p className={styles.shuxian}> <span></span></p>
          <p className={styles.FiveDotP}>
            <span className={styles.FiveSp2}>贷后管理</span><img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/><span></span>
          </p>




        </div>






      </div>
    )
  }
}
