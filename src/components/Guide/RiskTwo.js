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
        <div className={styles.TwoImgBox}>
          <img src={require("~/assets/riskManagement/riskmang_icon2@2x.png")}/>
        </div>
        <div className={styles.TwoContBox}>
          <p> 汇聚来自金融、互联网、法律行业多名精英人士，多人曾经在国内各大银行及知名金融机构从事专业管理工作，亲历中国金融市场的发展与变革，出色的专业素养、丰富的实践经验使众高管对互联网金融形成独到见解，致力于打造同行业最具竞争力、创新能力的P2P风险防控及资产保全团队。</p>
        </div>
      </div>
    )
  }
}
