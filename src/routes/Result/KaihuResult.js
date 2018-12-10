import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import {ENV, getUrlParams} from '~/utils/utils'
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class KaihuResult extends React.Component {

  redirect = (action) => {
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  render(){

    const cifAccount = getUrlParams().cifAccount;

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜，{cifAccount} <br/> 已成功开通银行存管！</h1>
        <p className={styles.desc}>开通安心签，交易安全更放心</p>
        <div className={styles.btns}>
          <Button type="primary" onClick={() => this.redirect(ResultJson.ca.action)}>立即开通安心签</Button>
        </div>
      </div>
    )
  }

}
