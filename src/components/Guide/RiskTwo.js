/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './RiskTwo.less';

@connect(state => ({
  global: state.global,
}))
export default class RiskTwo extends React.Component {
  render(){
    return(
      <div className={styles.RiskTwoBox}>
          <p >
            <span>
              专业的风控团队
              <span></span>
            </span>
          </p>

        <div className={styles.TwoContBox}>
          <div className={styles.TwoCont}>
            <p>去投网先后聘请北京德恒律师事务所和北京盈科律师事务所作为法务保障团队。针对去投网的业务模式、产品模式、风险控制、信息披露等问题，律师事务所出具专业法律意见，协助去投网合规备案和合规运营，更好的保障出借人的合法权益。</p>
          </div>
          <img src={require("~/assets/riskManagement/riskmang_icon2@2x.png")}/>

        </div>

      {/*  <div className={styles.TwoImgBox}>
          <img src={require("~/assets/riskManagement/riskmang_icon2@2x.png")}/>
        </div>
        <div className={styles.TwoContBox}>
          <p>去投网先后聘请北京德恒律师事务所和北京盈科律师事务所作为法务保障团队。针对去投网的业务模式、产品模式、风险控制、信息披露等问题，律师事务所出具专业法律意见，协助去投网合规备案和合规运营，更好的保障出借人的合法权益。</p>
        </div>*/}
      </div>
    )
  }
}
