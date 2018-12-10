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
export default class LendResult extends React.Component {

  redirect = (action) => {
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  render(){

    const params = getUrlParams();

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>出借成功！</h1>
        <div className={styles.huibao}>
          <p>
            <span className={styles.sp1}>{params.amount || null}</span>
            <span className={styles.sp2}>出借金额(元)</span>
          </p>
          <p>
            <span className={styles.sp1}>{params.cifAccount || null}</span>
            <span className={styles.sp2}>目标回报(元)</span>
          </p>
        </div>
        <div className={styles.btns}>
          <Button type="default" onClick={() => this.redirect(ResultJson.lookCj.action)}>查看我的出借</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>继续出借</Button>
        </div>
      </div>
    )
  }

}
