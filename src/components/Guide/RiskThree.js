/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './RiskThree.less';

@connect(state => ({
  global: state.global,
}))
export default class RiskThree extends React.Component {
  render(){
    return(
      <div className={styles.RiskThreeBox}>
        <div className={styles.ThreeHead}>
          <p >
            <span>
              全面的审核流程
              <span></span>
            </span>
          </p>
        </div>

        <div className={styles.ThreeContBox}>
            <p className={styles.ContP}>
              <span>确认借款人需求</span>
              <span></span>
              <span></span>
            </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span></span>
            <span></span>
            <span>申请资料审核</span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span>信息分析</span>
            <span></span>
            <span></span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span></span>
            <span></span>
            <span>风险评估</span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span>综合分析</span>
            <span></span>
            <span></span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span></span>
            <span></span>
            <span>方案制定</span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span>撮合匹配</span>
            <span></span>
            <span></span>
          </p>
          <p><span></span></p>
          <p className={styles.ContP}>
            <span></span>
            <span></span>
            <span>贷后管理</span>
          </p>
        </div>
      </div>
    )
  }
}
