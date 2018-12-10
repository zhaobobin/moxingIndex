import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { ENV, getUrlParams } from '~/utils/utils'
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class CzResult extends React.Component {

  redirect = (action) => {
    //window.CzResult.toast(action);      //与原生交互
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  render(){

    const amount = getUrlParams().amount;

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您充值成功！</h1>
        <p className={styles.amount}>您已成功充值{amount}元</p>
        <div className={styles.btns}>
          <Button onClick={() => this.redirect(ResultJson.lookCz.action)}>查看我的充值</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>立即出借</Button>
        </div>
      </div>
    )
  }

}
