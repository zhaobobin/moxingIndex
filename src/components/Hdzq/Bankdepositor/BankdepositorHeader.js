import React from 'react';
import { connect } from 'dva';
//样式
import styles from './BankdepositorHeader.less';

@connect(state => ({
  global: state.global,
}))
export default class BankdepositorHeader extends React.Component {
  render(){
    return(
      <div className={styles.BankdepositorHeaderBox}>
        <img src={require("~/assets/Bankdepositor/bank_app_title@2x.png")}/>
      </div>
    )
  }

}
