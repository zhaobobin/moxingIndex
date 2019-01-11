/*为什么进行存管*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './BankdepositorCause.less';

@connect(state => ({
  global: state.global,
}))
export default class BankdepositorCause extends React.Component {
  render(){
    return(
      <div className={styles.BankdepositorCauseBox}>
        <img src={require("~/assets/Bankdepositor/bank_app_subheading2@2x.png")} className={styles.CauseTitleImg}/>
        <div className={styles.CauseContBox}>
            <h2>
              <img src={require("~/assets/Bankdepositor/bank_app_01@2x.png")} />
              <p>资金完全隔离</p>
            </h2>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon1@2x.png")} />
            <p>用户资金和平台资金分账管理</p>
          </div>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon2@2x.png")} />
            <p>平台无法触碰用户资金</p>
          </div>

          <h2>
            <img src={require("~/assets/Bankdepositor/bank_app_02@2x.png")} />
            <p>银行全面监督</p>
          </h2>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon3@2x.png")} className={styles.supervisionImg}/>
            <p>银行全面监督用户每笔交易流向</p>
          </div>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon4@2x.png")} className={styles.supervisionImg}/>
            <p>确保每笔资金流动均被客户 <br/>认可和知悉</p>
          </div>

          <h2>
            <img src={require("~/assets/Bankdepositor/bank_app_03@2x.png")} />
            <p>交易真实可查</p>
          </h2>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon5@2x.png")} className={styles.transactionImg}/>
            <p>存管银行对交易流程进行管理 <br/> 并记录用户资金流向</p>
          </div>
          <div className={styles.ContentBox}>
            <img src={require("~/assets/Bankdepositor/bank_app_icon6@2x.png")} className={styles.transactionImg}/>
            <p>存管银行定期公布存管报告</p>
          </div>
        </div>
      </div>
    )
  }
}
