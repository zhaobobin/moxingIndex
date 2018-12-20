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

          <p className={styles.SevenContP}>
            <img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/>
            <span>实地尽职调查</span>
          </p>
          <div className={styles.SevenContDiv}>
            <p>1.实地考察</p>
            <p>2.财务状况评估</p>
            <p>3.社保信息对照</p>
            <p>4.纳税记录</p>
          </div>
          <p className={styles.SevenContP}>
            <img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/>
            <span>多重信用审核</span>
          </p>
          <div className={styles.SevenContDiv}>
            <p>1.资料审核</p>
            <p>2.黑名单查询</p>
            <p>3.征信报告审查</p>
          </div>
          <p className={styles.SevenContP}>
            <img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/>
            <span>贷中贷后管理</span>
          </p>
          <div className={styles.SevenContDiv}>
            <p>1.缴纳保证金</p>
            <p>2.定期贷后回访</p>
            <p>3.还款来源追踪</p>
            <p>4.还款提醒/催收</p>
          </div>
          <p className={styles.SevenContP}>
            <img src={require("~/assets/platform/found_platform_pg51@2x.png")} alt="" className={styles.dotImg}/>
          </p>
        </div>




      </div>
    )
  }
}
