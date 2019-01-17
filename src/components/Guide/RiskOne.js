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
          <div className={styles.OneImgBox}>
            <img src={require("~/assets/riskManagement/riskmang_icon1@2x.png")}/>
          </div>
        <div className={styles.OneContBox}>
          <p> 风险控制是去投网运营的核心，这一方面是为了充分预防风险的发生，另一方面也是为了确保公司可以更顺畅地持续运营，从而为更多的出借人提供更优质的服务。</p>
          <p> 我们的风控机制包括法务、合规、风控、稽核、借后服务等多个环节，覆盖借前、借中和借后的整个流程。我们主要审核和评估借款人的还款意愿和还款能力，加上对长期积累的大数据的研究后进行多维度的人群、行业及特点分析，不断对风险控制的把控、风险防范的机制进行完善、调整，从而有效地防范了信用风险。</p>
        </div>
      </div>
    )
  }
}
