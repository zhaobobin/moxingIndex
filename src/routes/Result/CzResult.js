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
export default class CzResult extends React.Component {

  redirect = (action) => {
    window.location.href = ENV.siteUrl + '?action=' + action;
  };

  render(){

    const searchParams = window.location.href.split('?')[1];
    const amount = getSearchString(searchParams).amount;

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您充值成功！</h1>
        <p className={styles.amount}>您已成功充值{amount}元</p>
        <div className={styles.btns}>
          <Button onClick={() => this.redirect(ResultJson.look.action)}>查看我的充值</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>继续出借</Button>
        </div>
      </div>
    )
  }

}
