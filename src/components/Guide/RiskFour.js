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
              <p className={styles.FourContP1}>大数据智能风控</p>
              <p className={styles.FourContP2}>多维度征信数据<br/>智能行为分析</p>
            </div>
          <div>
            <img src={require("~/assets/riskManagement/riskmang_icon5@2x.png")} className={styles.FourImg2}/>
            <p className={styles.FourContP1}>专业加密技术</p>
            <p className={styles.FourContP2}>全球可信SSL安全加密认证<br/>WEB端及服务端双重验证</p>
          </div>
          <div>
            <img src={require("~/assets/riskManagement/riskmang_icon4@2x.png")} className={styles.FourImg3}/>
            <p className={styles.FourContP1}>关系图谱模型</p>
            <p className={styles.FourContP2}>通过关系图谱模型测算<br/>甄别隐藏的风险点</p>
          </div>
        </div>

      </div>
    )
  }
}
