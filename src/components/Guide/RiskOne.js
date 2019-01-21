/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './RiskOne.less';

@connect(state => ({
  global: state.global,
}))
export default class RiskOne extends React.Component {
  render(){
    return(
      <div className={styles.RiskOneBox}>
        <p >
            <span>
              大数据风控系统
              <span></span>
            </span>
        </p>
        <div className={styles.OneContBox}>
          <img src={require("~/assets/riskManagement/riskmang_icon1@2x.png")}/>
          <div className={styles.OneCont}>
            <p> 独创“先知”大数据风控系统，依托大数据、云计算和人工智能等先进科技技术，通过自动采集2000多个维度的征信数据，结合人脸识别、微表情、关系图谱等，帮助去投网甄别隐藏的风险点，防范欺诈行为</p>
          </div>
        </div>

      </div>
    )
  }
}
