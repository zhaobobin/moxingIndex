import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { ENV, getSearchString } from '~/utils/utils'
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class TxResult extends React.Component {

  redirect = (action) => {
    window.location.href = ENV.siteUrl + '?action=' + action;
  };

  render(){

    const searchParams = window.location.href.split('?')[1];
    const amount = getSearchString(searchParams).amount;

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您提现成功！</h1>
        <p className={styles.amount}>您已成功提现{amount}元</p>
        <p className={styles.desc}>实际到账以银行卡到账为准</p>
        <div className={styles.btns}>
          <Button type="primary" onClick={() => this.redirect(ResultJson.look.action)}>查看我的提现记录</Button>
        </div>
      </div>
    )
  }

}
