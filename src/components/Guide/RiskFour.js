/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './RiskFour.less';

@connect(state => ({
  global: state.global,
}))
export default class RiskFour extends React.Component {
  render(){
    return(
      <div className={styles.RiskFourBox}>
        <div className={styles.FourHead}>
          <p >
            <span>
              技术安全
              <span></span>
            </span>
          </p>
        </div>

        <div className={styles.FourContBox}>
            <div>
              <img src={require("~/assets/riskManagement/riskmang_icon3@2x.png")} className={styles.FourImg1}/>
              <p className={styles.FourContP1}>系统安全</p>
              <p className={styles.FourContP2}>3层防火墙隔离系统<br/>保障平台系统安全</p>
            </div>
          <div>
            <img src={require("~/assets/riskManagement/riskmang_icon5@2x.png")} className={styles.FourImg2}/>
            <p className={styles.FourContP1}>隐私安全</p>
            <p className={styles.FourContP2}>严格的用户信息操作规范<br/>确保用户隐私不被泄露和侵犯</p>
          </div>
          <div>
            <img src={require("~/assets/riskManagement/riskmang_icon4@2x.png")} className={styles.FourImg3}/>
            <p className={styles.FourContP1}>数据安全</p>
            <p className={styles.FourContP2}>采用最先进数字技术<br/>通过数据中心，同步备份<br/>确保历史数据永久保存</p>
          </div>
        </div>

      </div>
    )
  }
}
