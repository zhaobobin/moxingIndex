/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './BankdepositorPattern.less';

@connect(state => ({
  global: state.global,
}))
export default class BankdepositorPattern extends React.Component {
  render(){
    return(
      <div className={styles.BankdepositorPatternBox}>
        <img src={require("~/assets/Bankdepositor/bank_app_subheading1@2x.png")} className={styles.PatternTitleImg}/>
        <div className={styles.PatternImgBox}>
          <img src={require("~/assets/Bankdepositor/bank_app_pattern@2x.png")} className={styles.PatternImg}/>
        </div>
      </div>
    )
  }
}
